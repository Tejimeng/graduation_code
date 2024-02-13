const jwt = require('jsonwebtoken');
const { secret_key, token_algorithm } = require('../constant/token.js');
const { excludePaths } = require('../constant/routes.js');
const tokenVerificationMiddleware = async (ctx, next) => {
    const path = ctx.request.path.replace(/^\/[^\/]*/, ''); // 去除路径前缀/xiachufang
    if (!excludePaths.includes(path)) {
        const authorizationHeader = ctx.headers.authorization;
        if (!authorizationHeader) {
            ctx.status = 403; // 设置状态码为 403 Forbidden
            ctx.body = {
                status: 'error',
                error: 'Forbidden',
                message: '您没有权限执行此操作'
            };
            return;
        }
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            ctx.body = {
                status: 'error',
                error: 'Forbidden',
                message: '您没有权限执行此操作'
            };
            ctx.status = 403; // 设置状态码为 403 Forbidden
            return;
        }
        try {
            const decoded = jwt.verify(token, secret_key, { algorithm: token_algorithm });
            // 在这里可以根据需要将解析出的 token 存储到 ctx.state 中，以便后续路由处理函数使用
            ctx.state.user = decoded;
            await next();
        } catch (err) {
            ctx.status = 401;
            ctx.body = {
                status: 'error',
                error: 'Unauthorized',
                message: 'Invalid token'
            };
        }
    } else {
        await next();
    }
};

module.exports = tokenVerificationMiddleware;