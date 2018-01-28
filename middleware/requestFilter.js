
const FastApiFac = require('../factory/fastapiFactory');

module.exports = async (ctx, next) => {
    let factory = new FastApiFac(ctx.request.url, ctx);
    let uri = factory.build();
    console.log(uri);
    let result = await factory.request(uri);
    console.log(result);
    ctx.response.status = 200;
    await next();
};