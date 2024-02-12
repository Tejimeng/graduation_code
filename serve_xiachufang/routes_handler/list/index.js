const indexController = async (ctx) => {
    ctx.body = {
        status: 'success',
        data: 'list-test',
        statusMessage: 'list！',
        statusCode: 200
    };
};

module.exports = { indexController };
