const Router = require('koa-router');
const index = new Router();
// 路由处理函数
const { login_verification_code } = require('../../routes_handler/login/index');
// 验证码登录
index.post('/login', login_verification_code);
module.exports = index;