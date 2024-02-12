const { initUser } = require('./initUser');
const jwt = require('jsonwebtoken');
const { secret_key, UserTable, UserInfoTable, token_time, token_algorithm } = require('../../constant/index.js');

const login_verification_code = async (ctx) => {
    try {
        // 获取请求体数据
        const bodyData = ctx.request.body;
        const phone = bodyData.phone;

        // 查询用户表是否存在
        const [tables] = await ctx.db_connection.query('SHOW TABLES LIKE ?', [UserTable]);
        // 如果用户表不存在，进行初始化用户表的操作
        if (tables.length === 0) {
            await initUser(ctx.db_connection, UserTable, UserInfoTable);
            console.log(`创建${UserTable}和${UserInfoTable}成功`);
        }
        // 查询用户表中是否存在相同account的数据
        const [rows] = await ctx.db_connection.query(`SELECT * FROM ${UserTable} WHERE account = ?`, [phone]);
        // 生成token

        if (rows.length === 0) {
            // 如果用户表中不存在相同account的数据，进行插入操作，直接注册
            await ctx.db_connection.query(`INSERT INTO ${UserTable} (account) VALUES (?)`, [phone]);
            // 获取插入的用户数据的 id
            const [userRows] = await ctx.db_connection.query(`SELECT id FROM ${UserTable} WHERE account = ?`, [phone]);
            const userId = userRows[0].id;
            // 向用户信息表插入默认数据
            await ctx.db_connection.query(`INSERT INTO ${UserInfoTable} (id,username) VALUES (?,?)`, [userId, `下厨房用户_${userId}`]);
            const token = jwt.sign({ account: phone }, secret_key, { expiresIn: token_time });
            ctx.body = {
                status: 'success',
                data: {
                    token: 'Bearer ' + token
                },
                statusMessage: '注册成功',
                statusCode: 200
            };
        } else {
            // 登录操作
            // 使用koa-jwt生成令牌并返回
            const token = jwt.sign({ account: phone }, secret_key, {
                expiresIn: token_time,
                algorithm: token_algorithm
            });
            ctx.body = {
                status: 'success',
                data: {
                    token: `Bearer ${token}`
                },
                statusMessage: '登录成功',
                statusCode: 200
            };
        }
    } catch (error) {
        // 捕获并处理错误
        ctx.status = error.status || 500;
        ctx.body = {
            status: 'error',
            statusMessage: error.message
        };
    }
};

module.exports = { login_verification_code };