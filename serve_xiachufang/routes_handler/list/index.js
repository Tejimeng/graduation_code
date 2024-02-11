const indexController = async (ctx) => {
    ctx.body = {
        status: 'success',
        data: 'list-test',
        statusMessage: '验证码登录成功！',
        statusCode: 200
    };
};

module.exports = { indexController };
