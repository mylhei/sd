module.exports = (ctx) => {
    let res = ctx.response.content.data;
    ctx.response.body = res;
}