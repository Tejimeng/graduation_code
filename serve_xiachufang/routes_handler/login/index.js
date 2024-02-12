
const login_verification_code = async (ctx) => {
    // // 获取查询参数
    // const queryParams = ctx.request.query;
    // // 获取请求体数据
    const bodyData = ctx.request.body;
    // // 获取路径参数
    // const userId = ctx.params.id;
    // // 获取请求头信息
    // const contentType = ctx.get('content-type');
    ctx.body = {
        status: 'success',
        data: bodyData,
        statusMessage: '验证码登录成功！',
        statusCode: 200
    };
};

module.exports = { login_verification_code };
