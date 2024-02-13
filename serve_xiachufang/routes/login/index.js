const Router = require('koa-router');
const index = new Router();
const { login_verification_code, login_password } = require('../../constant/routes');
const { loginVerificationCode, loginPassword } = require('../../routes_handler/login/index');
// 收取验证码

// 验证码登录
index.post(login_verification_code, loginVerificationCode);
// 密码登录
index.post(login_password, loginPassword);
module.exports = index;