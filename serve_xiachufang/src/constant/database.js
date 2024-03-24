// 数据库配置
const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'huhaohui',
    database: 'database_xiachufang'
};
// 表名
const UserTable = 'user';// 用户表
const UserInfoTable = 'userInfo';// 用户信息表
const RecipesTable = 'recipes';// 食谱表
const RecipesCommentTable = 'recipesComment';// 用户信息表
module.exports = { dbConfig, UserTable, UserInfoTable, RecipesTable, RecipesCommentTable };