
const FASTAPI = {
    'dev': 'http://sx.g.fastapi.net/s2s?',
    'product': 'http://x.fastapi.net/s2s?'
};

const FASTAPI_TRACK = {
    'dev': 'http://sx.g.fastapi.net/t?',
    'product': 'http://x.fastapi.net/t?'
};

const ENV = process.env.ENV || 'dev';

exports.FASTAPI = FASTAPI[ENV];
exports.FASTAPI_TRACK = FASTAPI[ENV];

module.exports = {
    FASTAPI: (() => {
        return FASTAPI[ENV];
    })(),
    getMapRouter: () => {
        return this.FASTAPI;
    }
};