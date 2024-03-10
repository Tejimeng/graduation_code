const Koa = require('koa');
const app = new Koa();
const cors = require('@koa/cors');
const path = require('path');
const koaStatic = require('koa-static');
const { koaBody } = require('koa-body');
const port = 9210;
const mainRouter = require('./utils/loadRouter');
const tokenVerificationMiddleware = require('./utils/tokenDetection');
const databaseMiddleware = require('./database/index.js');
const notFoundMiddleware = require('./utils/notFound');
// 跨域简易解决
const allowedOrigins = ['http://localhost:5173','http://127.0.0.1:5173']; // 允许的来源地址列表
app.use(cors({
    origin: ctx => {
        const requestOrigin = ctx.request.header.origin;
        if (allowedOrigins.includes(requestOrigin)) {
            return requestOrigin;
        }
        // 返回 403 状态码和错误信息，告知客户端跨域请求被拒绝
        ctx.status = 403;
        ctx.body = { error: 'Cross-Origin Request Blocked' };
    },
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
// 设置静态资源文件夹
const staticPath = './public';
app.use(koaStatic(path.join(__dirname, staticPath)));
// 参数解析
app.use(koaBody());
// 获取数据库的连接
app.use(databaseMiddleware);
// token检测
app.use(tokenVerificationMiddleware);
// 路由注册
app.use(mainRouter.routes());
// notFound
app.use(notFoundMiddleware);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
