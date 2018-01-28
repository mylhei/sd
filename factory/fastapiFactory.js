
const qs = require('querystring');
const axios = require('axios');

const baseFactory = require('./baseFactory');
const { FASTAPI } = require('../config/mapRouter');
const { trackingPrefix } = require('../config/config');

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

const NEED_JUMP_URL_ARR = ['download_urls', 'downloaded_urls', 'install_urls', 'installed_urls'];

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
            // show的服务
            if (this.path === '/s') {
                let domain = FASTAPI;
                let params = this.query;
                for (let key in FastApiArguments) {
                    if (!FastApiArguments.hasOwnProperty(key)) return;
                    let elem = FastApiArguments[key];

                    // 强制使用Header数据
                    if (elem.useHeader) {
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

                this.params = params;

                // 去掉jsonp，由自己处理
                if (params.jsonp) {
                    params = Object.assign({}, params);
                    delete params.jsonp;
                }
                return `${domain}${qs.stringify(params)}`;
            } else if (this.path === '/t') {
                // TODO fastapi的地址
            }
        }

        return null;

    }

    request (ctx, uri) {
        if(!uri) {
            return Promise.resolve({
                code: 200,
                type: 'image',
                data: 'ok'
            });
        }
        return axios.get(uri);
        // console.log(uri);
        // return ctx.$http.get(uri)
    }

    filter (content) {
        if (content && content.data) {
            if (content.data.ad) {
                let ad = content.data.ad[0];
                for(let key in ad.imp) {
                    if (ad.imp[key] instanceof Array) {
                        ad.imp[key].push(`${trackingPrefix}${qs.stringify(Object.assign({type: 'impr'},this.params))}`)
                    }
                }

                if (ad.clk && ad.clk instanceof Array) {
                    ad.clk.push(`${trackingPrefix}${qs.stringify(Object.assign({type: 'clk'},this.params))}`)
                }

                if (ad.url) {
                    ad.url = `${trackingPrefix}u=${encodeURIComponent(ad.url)}`;
                }

                NEED_JUMP_URL_ARR.forEach(u => {
                    if (ad[u]) {
                        ad[u] = `${trackingPrefix}u=${encodeURIComponent(ad[u])}`;
                    }
                })
            }

        }
        return content;
    }
}

module.exports = FastApiFactory;