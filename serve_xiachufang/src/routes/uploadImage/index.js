const Router = require('koa-router');
const index = new Router();
const uploadImageHandler = require('../../routes_handler/uploadImage');
index.post('/uploadImage', uploadImageHandler);

module.exports = index;