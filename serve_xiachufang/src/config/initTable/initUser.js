// 用户表和用户信息表进行关联
const { initUserInfo, insertUserInfoDefaultValue } = require('./initUserInfo');
const initUser = async (connection, userTable, userInfoTable) => {
    try {
        // 创建用户表
        await connection.query(`
            CREATE TABLE IF NOT EXISTS ${userTable} (
                id INT AUTO_INCREMENT PRIMARY KEY,
                account VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL DEFAULT '123456',
                registerAt BIGINT DEFAULT (UNIX_TIMESTAMP() * 1000)
            )
        `);
        // 插入默认数据
        await insertUserDefaultValue(connection, userTable, userInfoTable);
        console.log('User table created');
    } catch (error) {
        console.error('Error creating user tables ', error);
    }
};
const insertUserDefaultValue = async (connection, userTable, userInfoTable) => {
    try {
        await connection.query(`
            INSERT INTO ${userTable} (account) VALUES 
            ('18279945646'),
            ('18970949591'),
            ('15279929916'),
            ('18279945642'),
            ('18279945643'),
            ('18277945646')
        `);
        console.log('User data inserted');
        await initUserInfo(connection, userTable, userInfoTable);
    } catch (error) {
        console.error('Error User tables inserting data:', error);
    }
};
module.exports = { initUser, insertUserDefaultValue };