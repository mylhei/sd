const axios = require('axios');

module.exports = (ctx, next) => {
    ctx.http = axios;
    next();
}
