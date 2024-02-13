const mysql = require('mysql2/promise');
const { dbConfig } = require('../constant/database.js');
// 连接池配置
const pool = mysql.createPool({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
const databaseMiddleware = async (ctx, next) => {
    let connection;
    try {
        connection = await pool.getConnection();
        // 数据库创建
        // console.log('Connected to database');
        // const [rows] = await connection.query(`SHOW DATABASES LIKE '${dbConfig.database}'`);
        // if (rows.length === 0) {
        //     await connection.query(`CREATE DATABASE ${dbConfig.database}`);
        //     // console.log('Database created');
        // } else {
        //     // console.log('Database already exists');
        // }
        // 挂载
        ctx.db_connection = connection;
        await next();
    } catch (error) {
        console.error('Error connecting to database:', error);
        ctx.status = 500;
        ctx.body = 'Internal Server Error';
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = databaseMiddleware;
