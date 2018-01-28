const FastApiFac = require('../factory/fastapiFactory');

module.exports = async (ctx, next) => {
    // 目前只支持Fastapi
    let factory = new FastApiFac(ctx.request.url, ctx);
    if (factory.query.u) {
        ctx.redirect(factory.query.u);
    } else {
        let uri = factory.build();
        let result = await factory.request(ctx, uri);

        if (result && result.data) {
            result = factory.filter(result);
        }

        if (factory.params.jsonp) {
            result.data = `${factory.params.jsonp}(${JSON.stringify(result.data)})`
        }

        ctx.response.content = result;
        ctx.response.status = 200;
        await next();
    }
};