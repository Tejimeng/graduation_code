// 用户表和用户信息表进行关联
const Chance = require('chance');
const chance = new Chance();
const initUserInfo = async (connection, userTable, userInfoTable) => {
    try {
        // 创建用户信息表 bio 个人介绍
        await connection.query(`
            CREATE TABLE IF NOT EXISTS ${userInfoTable} (
                id INT  PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                avatar VARCHAR(255) DEFAULT 'https://s11.ax1x.com/2023/06/09/pCEADYt.jpg',
                gender ENUM('male', 'female', 'other') DEFAULT 'other',
                birthday DATE DEFAULT '1970-01-01',
                hometown VARCHAR(255) DEFAULT '中国',
                bio TEXT,
                FOREIGN KEY (id) REFERENCES ${userTable}(id)
            )
        `);
        // 插入默认数据
        await insertUserInfoDefaultValue(connection, userTable, userInfoTable);
        console.log('User info inserted ');
    } catch (error) {
        console.error('Error creating tables and inserting data:', error);
    }
};
const insertUserInfoDefaultValue = async (connection, userTable, userInfoTable) => {
    try {
        // 获取插入的用户数据的 id
        const [rows] = await connection.query('SELECT id FROM ' + userTable);
        const userIds = rows.map(row => row.id);

        // 向用户信息表插入相应的数据
        for (const userId of userIds) {
            let randomName = chance.name();
            await connection.query(`
                INSERT INTO ${userInfoTable} (id,username) VALUES (?,?)
            `, [userId, randomName]);
        }
        console.log('UserInfo data inserted');
    } catch (error) {
        console.error('Error UserInfo tables inserting data:', error);
    }
};
module.exports = { initUserInfo, insertUserInfoDefaultValue };