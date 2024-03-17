// 未匹配路由中间件
const notFoundMiddleware = async (ctx, next) => {
    // 返回一个统一的路由函数
    ctx.body = {
        error: 'Failed',
        code: 404,
        status: 'error',
        message: '路径未找到'
    };
    ctx.status = 404;
};
module.exports = notFoundMiddleware;
