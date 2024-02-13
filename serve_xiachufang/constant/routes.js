// 路由
const login_verification_code = '/login_verification_code';// 验证码登录
const login_password = '/login_password';// 密码登录

// 路由白名单
const excludePaths = [login_verification_code, login_password];
module.exports = { login_verification_code, login_password, excludePaths };