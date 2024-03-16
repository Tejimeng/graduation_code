const path = require('path');

const imageContentTypeMiddleware = async (ctx, next) => {
    const filePath = ctx.request.url;
    if (filePath.startsWith('serverImage/')) {
        ctx.type = path.extname(filePath); // 设置Content-Type为图片的文件扩展名
    }
    await next(); // 调用下一个中间件
};

module.exports = imageContentTypeMiddleware;
