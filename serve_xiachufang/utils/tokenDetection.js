const jwt = require('jsonwebtoken');
const { secret_key, token_algorithm } = require('../constant/token.js');
const { excludePaths } = require('../constant/routes.js');
const tokenVerificationMiddleware = async (ctx, next) => {
    const path = ctx.request.path.replace(/^\/[^\/]*/, ''); // 去除路径前缀/xiachufang
    if (!excludePaths.includes(path)) {
        const authorizationHeader = ctx.headers.authorization;
        if (!authorizationHeader) {
            ctx.status = 403;
            ctx.body = {
                code: 403,
                status: 'error',
                error: 'Forbidden',
                message: '您没有权限执行此操作'
            };
            return;
        }
        const accessKey = authorizationHeader.split(' ')[1];
        if (!accessKey) {
            ctx.body = {
                code: 403,
                status: 'error',
                error: 'Forbidden',
                message: '您没有权限执行此操作'
            };
            ctx.status = 403;
            return;
        }
        try {
            const decoded = jwt.verify(accessKey, secret_key, { algorithm: token_algorithm });
            // 当前用户
            ctx.state.user = decoded.account;
            await next();
        } catch (err) {
            ctx.status = 401;
            ctx.body = {
                code: 401,
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