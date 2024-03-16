const cors = require('@koa/cors');

const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];

const crossOriginMiddleware = () => {
    return cors({
        origin: (ctx) => {
            const requestOrigin = ctx.request.header.origin;
            // console.log('请求头url：', ctx.request.header);
            if (allowedOrigins.includes(requestOrigin)) {
                return requestOrigin;
            }
            if (ctx.url.startsWith('serverImage/')) {
                return '*';
            }
            // 其他情况返回 403 状态码和错误信息
            ctx.status = 403;
            ctx.body = {
                error: 'Cross-Origin Request Blocked',
                code: 403,
                status: 'error',
                message: '请求失败'
            };
        },
        methods: ['GET', 'PUT', 'POST', 'DELETE'],
        allowedHeaders: ['Content-Type']
    });
};

module.exports = crossOriginMiddleware;
