const Router = require('koa-router');
const index = new Router();
// 路由处理函数
const { indexController } = require('../../routes_handler/list/index');
// 注册
index.get('/list', indexController);
// 重定向
index.redirect('/', '/xiachufang/list');
module.exports = index;