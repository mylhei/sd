
const url = require('url');
const qs = require('querystring');

class baseFactory {
    constructor (uri, ctx, next) {
        this.uri = uri;
        let u = url.parse(uri);
        this.query = qs.parse(u.query);
        this.path = u.pathname;
        this.ctx = ctx;
    }
}

module.exports = baseFactory;