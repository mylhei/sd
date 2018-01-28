
const FASTAPI = {
    'dev': 'http://sx.g.fastapi.net/s2s?',
    'product': 'http://x.fastapi.net/s2s?'
}

const ENV = process.env.ENV || 'dev';

exports.FASTAPI = FASTAPI[ENV];

module.exports = {
    FASTAPI: (() => {
        return FASTAPI[ENV];
    })(),
    getMapRouter: () => {
        return this.FASTAPI;
    }
};