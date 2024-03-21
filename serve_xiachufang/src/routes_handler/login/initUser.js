// 用户表和用户信息表进行关联
const initUser = async (connection, userTable, userInfoTable) => {
    try {
        // 创建用户表
        await connection.query(`
            CREATE TABLE IF NOT EXISTS ${userTable} (
                id INT AUTO_INCREMENT PRIMARY KEY,
                account VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL DEFAULT '123456'
            )
        `);
        // 创建用户信息表
        await connection.query(`
            CREATE TABLE IF NOT EXISTS ${userInfoTable} (
                id INT  PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                avatar VARCHAR(255) DEFAULT 'default_avatar.jpg',
                gender ENUM('male', 'female', 'other') DEFAULT 'other',
                birthday DATE DEFAULT '1970-01-01',
                hometown VARCHAR(255) DEFAULT '中国',
                bio TEXT,
                FOREIGN KEY (id) REFERENCES ${userTable}(id)
            )
        `);
        // 插入默认数据
        await connection.query(`
            INSERT INTO ${userTable} (account) VALUES 
            ('18279945646'),
            ('18970949591'),
            ('15279929916')
        `);
        console.log('Tables created and data inserted & 默认数据已插入');
        // 获取插入的用户数据的 id
        const [rows] = await connection.query('SELECT id FROM ' + userTable);
        const userIds = rows.map(row => row.id);

        // 向用户信息表插入相应的数据
        for (const userId of userIds) {
            await connection.query(`
                INSERT INTO ${userInfoTable} (id,username) VALUES (?,?)
            `, [userId, `下厨房用户_${userId}`]);
        }
        console.log('User info inserted & 用户信息已插入');
    } catch (error) {
        console.error('Error creating tables and inserting data:', error);
    }
};

module.exports = { initUser };