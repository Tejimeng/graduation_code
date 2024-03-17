const indexController = async (ctx) => {
    ctx.body = {
        account:ctx.state.user,
        status: 'success',
        data: 'list-test',
        statusMessage: 'list！',
        statusCode: 200
    };
};

module.exports = { indexController };
