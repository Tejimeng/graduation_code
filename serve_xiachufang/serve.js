const Koa = require('koa');
const app = new Koa();
const path = require('path');
const koaStatic = require('koa-static');
const { koaBody } = require('koa-body');
const port = 9210;
const mainRouter = require('./utils/loadRouter.js');
const tokenVerificationMiddleware = require('./utils/tokenDetection.js');
const databaseMiddleware = require('./database/index.js');
const crossOriginMiddleware = require('./utils/crossOrigin.js');
// const imageContentTypeMiddleware = require('./utils/imageContentTypeMiddleware');
const notFoundMiddleware = require('./utils/notFound');

// 配置静态资源服务器的返回类型  koa-static自带不需要手动设置
// app.use(imageContentTypeMiddleware);

app.use(koaStatic(path.join(__dirname, 'static')));
app.use(koaBody());
app.use(databaseMiddleware);
app.use(crossOriginMiddleware());
app.use(tokenVerificationMiddleware);
app.use(mainRouter.routes());
app.use(notFoundMiddleware);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
