const Koa = require('koa');
const app = new Koa();
const port = 9210;
const mainRouter = require('./utils/loadRouter');
const notFoundMiddleware = require('./utils/notFound');
app.use(mainRouter.routes());
app.use(notFoundMiddleware);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
