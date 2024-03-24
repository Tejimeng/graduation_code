// 路由
const login_verification_code = '/login_verification_code';// 验证码登录
const login_password = '/login_password';// 密码登录
// const image_folder_path = '/serverImage'; // 存储图片的文件夹路径/static
const all_recipes = '/all_recipes'; // 所有食谱
const recipes_by_page = '/recipes_by_page';// 分页查询
const app_recommended_recipes = '/app_recommended_recipes';
// 路由白名单
const excludePaths = [login_verification_code, login_password, all_recipes, recipes_by_page, app_recommended_recipes];
// 路由导出
module.exports = {
    login_verification_code,
    login_password,
    all_recipes,
    recipes_by_page,
    app_recommended_recipes,
    excludePaths
};