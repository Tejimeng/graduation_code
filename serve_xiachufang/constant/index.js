// 定义常量
// token
const secret_key = 'hu_hao_hui';
const token_time = '20s';
const token_algorithm='HS256'
// 数据库配置
const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'huhaohui',
    database: 'database_xiachufang'
};
// 表名
const UserTable = 'user';
const UserInfoTable = 'userInfo';


module.exports = {token_algorithm, token_time, secret_key, dbConfig, UserTable, UserInfoTable };