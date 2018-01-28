
const qs = require('querystring');
const axios = require('axios');

const baseFactory = require('./baseFactory');
const { FASTAPI } = require('../config/mapRouter');

const FastApiArguments = {
    "ip" : {required: true, useHeader: false},
    "ua" : {required: true, useHeader: true},
    "uid" : {required: false},
    "si" : {required: true},
    "rr" : {required: false},
    "url" : {required: false},
    "min" : {required: false},
    "max" : {required: false},
    "reqid" : {required: false},
    "bf" : {required: false},
    "tagid" : {required: false, default: 0},
    "device" : {required: false, type: Object},
    "gps" : {required: false, type: Object},
    "app_version": {required: false},
    "mimes": {required: true, enums: []},
    "jsonp": {required: false},
    "v": {required: true, default: '1.3.6'},
};

class FastApiFactory extends baseFactory {
    constructor (uri, ctx) {
        super(uri, ctx);
        let req = ctx.request;
        let ip = req.get("X-Real-IP") || req.get("X-Forwarded-For") || req.ip;
        let ua = req.get('User-Agent') || 'Unknown';
        this.ip = ip;
        this.ua = ua;
    }

    check () {
        return true;
    }

    build () {
        if (this.check()) {
            let domain = FASTAPI;
            let params = qs.parse(this.query);
            for(let key in FastApiArguments) {
                if (!FastApiArguments.hasOwnProperty(key)) return;
                let elem = FastApiArguments[key];

                // 强制使用Header数据
                if(elem.useHeader) {
                    params[key] = this[key] || elem;
                }

                // 删掉多余的参数
                if (!elem.required && !params[key]) {
                    delete params[key];
                }

                // 没有取值的取默认值
                if (elem.required && typeof params[key] === 'undefined' && typeof elem.default !== 'undefined') {
                    params[key] = elem.default;
                }
            }
            return `${domain}${qs.stringify(params)}`;
        }

        return null;

    }

    request (uri) {
        return axios.get(uri)
    }
}

module.exports = FastApiFactory;