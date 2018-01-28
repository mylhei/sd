
const url = require('url');

class baseFactory {
    constructor (uri, ctx, next) {
        this.uri = uri;
        this.query = url.parse(uri).query;
        this.ctx = ctx;
    }
}

module.exports = baseFactory;