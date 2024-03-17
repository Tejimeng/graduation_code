const jwt = require('jsonwebtoken');
const { secret_key, token_algorithm } = require('../constant/token.js');
const { excludePaths } = require('../constant/routes.js');
const tokenVerificationMiddleware = async (ctx, next) => {
    // 图片资源特殊处理 没有存储服务器 如果路径以 /static/serverImage/ 开头，则直接跳过权限校验和前缀去除
    if (ctx.request.path.startsWith('/static/serverImage/')) {
        console.log(ctx.request.path);
        await next();
        return;
    }
    const path = ctx.request.path.replace(/^\/[^\/]*/, ''); // 去除路径前缀xiachufang
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
            // console.log('这是token检测中的ctx',ctx);
            await next();
        } catch (err) {
            ctx.status = 403;
            ctx.body = {
                code: 403,
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
