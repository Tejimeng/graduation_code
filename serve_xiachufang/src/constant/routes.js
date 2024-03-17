// 路由
const login_verification_code = '/login_verification_code';// 验证码登录
const login_password = '/login_password';// 密码登录
const image_folder_path = '/serverImage'; // 存储图片的文件夹路径/static

// 路由白名单
const excludePaths = [login_verification_code, login_password];
module.exports = { login_verification_code, login_password, excludePaths };