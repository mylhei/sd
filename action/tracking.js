module.exports = (ctx, next) => {
    let { code , type , data} = ctx.response.content;
    if (code === 200) {
        ctx.set('Content-Type', 'image/gif');
        ctx.body = data;
    }
};
