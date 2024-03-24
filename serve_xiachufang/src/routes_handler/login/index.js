const jwt = require('jsonwebtoken');
const { UserTable, UserInfoTable } = require('../../constant/database.js');
const { secret_key, token_time, token_algorithm } = require('../../constant/token.js');
const { initUser, insertUserDefaultValue } = require('../../config/initTable/initUser');
const {
    addValidate,
    updateValidate,
    deleteValidate,
    passwordValidate,
    verificationCodeValidate
} = require('../../config/validateSchema/userSchema'); // 导入参数校验函数
const Chance = require('chance');
const chance = new Chance();
const checkAndInitTable = async (ctx) => {
    try {
        // 检查表是否存在
        const [existingTables] = await ctx.db_connection.query('SHOW TABLES LIKE ?', [UserTable]);

        if (existingTables.length === 0) {
            // 如果表不存在，则进行初始化表的操作
            await initUser(ctx.db_connection, UserTable, UserInfoTable);
        } else {
            // 表存在但没有数据的情况
            const [rowCount] = await ctx.db_connection.query(`SELECT COUNT(*) as count FROM ${UserTable}`);
            const dataCount = rowCount[0].count;
            if (dataCount === 0) {
                // 如果表存在但没有数据，则进行初始化表的操作
                await insertUserDefaultValue(ctx.db_connection, UserTable, UserInfoTable);
            }
        }
    } catch (error) {
        console.error('Error checking table existence:', error);
    }
};
const loginVerificationCode = async (ctx) => {
    try {
        // 在查询之前进行表存在性检查
        await checkAndInitTable(ctx);
        // 获取请求体数据
        const bodyData = ctx.request.body;
        // 参数校验
        const validationResult = verificationCodeValidate(bodyData);
        if (validationResult.error) {
            ctx.status = 400; // Bad Request
            ctx.body = {
                code: 400,
                status: 'error',
                message: validationResult.error.message,
                details: validationResult.error.details
            };
            return;
        }
        const account = bodyData.account;
        // 查询用户表中是否存在相同account的数据
        const [rows] = await ctx.db_connection.query(`SELECT * FROM ${UserTable} WHERE account = ?`, [account]);

        if (rows.length === 0) {
            // 如果用户表中不存在相同account的数据，进行插入操作，直接注册
            await ctx.db_connection.query(`INSERT INTO ${UserTable} (account) VALUES (?)`, [account]);
            // 获取插入的用户数据的 id
            const [userRows] = await ctx.db_connection.query(`SELECT id FROM ${UserTable} WHERE account = ?`, [account]);
            const userId = userRows[0].id;
            // 向用户信息表插入默认数据
            const randomName = chance.name();
            await ctx.db_connection.query(`INSERT INTO ${UserInfoTable} (id,username) VALUES (?,?)`, [userId, randomName]);
            const token = jwt.sign({ account: account }, secret_key, { expiresIn: token_time });
            // 返回体内容
            ctx.status = 200;
            ctx.body = {
                code: 200,
                status: 'success',
                data: {
                    accessKey: 'Bearer ' + token
                },
                message: '注册成功'
            };
        } else {
            // 登录操作
            // 使用koa-jwt生成令牌并返回
            const token = jwt.sign({ account: account }, secret_key, {
                expiresIn: token_time,
                algorithm: token_algorithm
            });
            ctx.status = 200;
            ctx.body = {
                code: 200,
                status: 'success',
                data: {
                    accessKey: 'Bearer ' + token
                },
                message: '登录成功'
            };
        }
    } catch (error) {
        // 捕获并处理错误
        ctx.status = error.status || 500;
        ctx.body = {
            code: error.status || 500,
            status: 'error',
            statusMessage: error.message
        };
    }
};
const loginPassword = async (ctx) => {
    try {
        // 在查询之前进行表存在性检查
        await checkAndInitTable(ctx);
        // 获取请求体数据
        const bodyData = ctx.request.body;
        // 参数校验
        const validationResult = passwordValidate(bodyData);
        if (validationResult.error) {
            ctx.status = 400; // Bad Request
            ctx.body = {
                code: 400,
                status: 'error',
                message: validationResult.error.message,
                details: validationResult.error.details
            };
            return;
        }
        const account = bodyData.account;
        const password = bodyData.password;

        // 查询用户表中是否存在相同account的数据
        const [rows] = await ctx.db_connection.query(`SELECT * FROM ${UserTable} WHERE account = ?`, [account]);

        if (rows.length === 0) {
            // 如果用户不存在，返回相应信息
            ctx.status = 200;
            ctx.body = {
                code: 200,
                status: 'error',
                message: '用户不存在'
            };
        } else {
            // 用户存在，检查密码是否匹配
            const user = rows[0];
            if (user.password === password) {
                // 密码匹配，生成并返回令牌
                const token = jwt.sign({ account: account }, secret_key, {
                    expiresIn: token_time,
                    algorithm: token_algorithm
                });
                ctx.status = 200;
                ctx.body = {
                    code: 200,
                    status: 'success',
                    data: {
                        accessKey: 'Bearer ' + token
                    },
                    message: '登录成功'
                };
            } else {
                // 密码不匹配，返回错误信息
                ctx.status = 200;
                ctx.body = {
                    code: 200,
                    status: 'error',
                    message: 'password error'
                };
            }
        }
    } catch (error) {
        // 捕获并处理错误
        ctx.status = error.status || 500;
        ctx.body = {
            code: error.status || 500,
            status: 'error',
            statusMessage: error.message
        };
    }
};
// 后续再写
// 修改password

// 注销用户
module.exports = { loginVerificationCode, loginPassword };