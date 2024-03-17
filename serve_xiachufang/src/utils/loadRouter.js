const fs = require('fs').promises;
const path = require('path');
const Router = require('koa-router');
// 前缀
const mainRouter = new Router({ prefix: '/xiachufang' });

// 路由目录
const routesDir = path.join(__dirname, '../routes');

// 加载单个
async function loadRoute(filePath) {
    try {
        const route = require(filePath);
        console.log(`${filePath} routes loaded successfully`);
        mainRouter.use(route.routes(), route.allowedMethods());
    } catch (err) {
        console.error('Error loading route module:', err);
    }
}

// 加载路由
async function loadRoutesLazy(dir) {
    try {
        const files = await fs.readdir(dir);
        const filePromises = files.map(async (file) => {
            const filePath = path.join(dir, file);
            const stats = await fs.stat(filePath);
            if (stats.isDirectory()) {
                // 目录
                return loadRoutesLazy(filePath);
            } else if (file.endsWith('.js')) {
                // 懒加载
                return loadRoute(filePath);
            }
        });
        await Promise.all(filePromises); // 等待
    } catch (err) {
        console.error(`Error loading ${dir} routes:`, err);
    }
}

// 异步加载路由模块
loadRoutesLazy(routesDir);

// 导出主路由
module.exports = mainRouter;
