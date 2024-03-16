const multer = require('@koa/multer');
const path = require('path');
const fs = require('fs');

// 设置存储配置
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderPath = getFolderPath();

        if (!fs.existsSync(folderPath)) {
            createFolder(folderPath); // 创建以日期为名的文件夹
        }

        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    }
});

const upload = multer({ storage });

// 创建文件夹函数
const createFolder = (folderPath) => {
    fs.mkdirSync(folderPath, { recursive: true });
};

// 获取项目根目录
const rootPath = path.join(__dirname, '..', '..', 'static', 'serverImage');

// 获取文件夹路径函数
const getFolderPath = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);

    return path.join('static', 'serverImage', year, month, day);
};

// 处理上传多个图片文件
const uploadMultipleImagesHandler = async (ctx, next) => {
    // console.log('触发了图片上传的函数');
    try {
        await upload.array('images')(ctx, next); // 传递 ctx 和 next 参数
        const fileUrls = ctx.files.map((file) => {
            const fileName = path.relative(rootPath, file.path).replace(/\\/g, '/');
            return `http://localhost:9210/serverImage/${fileName}`;
        });
        ctx.status = 200;
        ctx.body = {
            imageUrls: fileUrls,
            code: 200,
            status: 'success',
            message: '上传成功'
        };
    } catch (err) {
        // console.log(err);
        ctx.status = 500;
        ctx.body = {
            error: 'File upload failed',
            code: 500,
            status: 'error',
            message: '上传失败'
        };
    }
};

module.exports = uploadMultipleImagesHandler;