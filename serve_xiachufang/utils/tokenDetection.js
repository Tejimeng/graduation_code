const jwt = require('jsonwebtoken');
const { secret_key ,token_algorithm} = require('../constant/index.js');

const tokenVerificationMiddleware = async (ctx, next) => {
    const path = ctx.request.path.replace(/^\/[^\/]*/, '');// 去除路径前缀/xiachufang
    const excludePaths = ['/login'];
    if (!excludePaths.includes(path)) {
        // 一定要去除Bearer!!!!!!
        const token = ctx.headers.authorization.split(' ')[1];
        if (!token) {
            ctx.status = 401;
            ctx.body = { error: 'Authorization header is missing' };
            return;
        }
        try {
            const decoded = jwt.verify(token, secret_key, { algorithm: token_algorithm });
            // 在这里可以根据需要将解析出的 token 存储到 ctx.state 中，以便后续路由处理函数使用
            ctx.state.user = decoded;
            await next();
        } catch (err) {
            ctx.body = { status: 401, error: 'Invalid token' };
        }
    } else {
        await next();
    }
};

module.exports = tokenVerificationMiddleware;