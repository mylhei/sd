const url = require('url');
const axios = require('axios');
const qs = require('querystring');

axios.interceptors.response.use(function (response) {
    let uri = url.parse(response.request.path);
    let path = uri.pathname;
    let query = qs.parse(uri.query);
    if (process.env.ENV === 'dev') {
        // mock fastapi请求
        if (path === '/s2s') {
            response.data = require('../mock/show');
            if (query.jsonp) {
                response.data = `${query.jsonp}(${JSON.stringify(response.data)})`
            }
        }
    }
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

module.exports = async (ctx, next) => {
    ctx.$http = axios;
    await next();
}
