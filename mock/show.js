module.exports = {
    "ad": [ // 广告素材，数组形式，目前最多只有一个素材，后期可能会扩展支持多个
        {
            "sid": "100",  // 广告位ID
            "aid" : "10000", //响应的素材ID
            "mime": "flv",   // 物料类型
            "src": "http://example.com/sample1.jpg", // 物料URL
            "ext_urls": ["http://example.com/sample2.jpg", "http://example.com/sample3.jpg"], // 额外的图片物料（用于三图）
            "width": 450, // 广告位宽度
            "height": 300, // 广告位高度
            "imp": { //该字段是数组，可以发送第三方展现监测
                "0" : [ //立刻上报
                    "http://example.com/monitor.gif?a=1&b=2",
                    "http://third-party.com/monitor.gif?a=1&b=2"
                ]
            },
            "clk": [ // 点击监测地址，当广告被点击时应当额外触发对这个数组中的URL的请求，以便监测点击事件。该字段是数组，希望支持多个点击监测地址。
                "http://example.com/click.gif?a=1&b=2",
                "http://third-party.com/monitor.gif?a=1&b=2"
            ],
            "title" : "信息流文字标题",
            "desc" : "信息流文字描述",
            "url":"http://brand-landing-page.com/", // 点击落地页，一般是广告主的网站或者电商购买页。
            "action" : 1,
            "price" : 300,  //竞价价格(cpm,分)，按对接需求响应,
            "app" : {
                "icon_url": "http://appicon.jpg", //应用图标
                "name": "应用名称",
                "package_name": "com.name.pkg", //应用包名,
            },
            "download_urls": [ //该字段返回时，app开始下载时必须上报，该字段是数组，需要支持多个监测地址。
                "http://example.com/download.gif?a=1&b=2"
            ],
            "downloaded_urls": [ //该字段返回时，app下载完成时必须上报，该字段是数组，需要支持多个监测地址。
                "http://example.com/downloaded.gif?a=1&b=2"
            ],
            "install_urls": [ //该字段返回时，app安装开始后上报，该字段是数组，需要支持多个监测地址。
                "http://example.com/install.gif?a=1&b=2"
            ],
            "installed_urls": [ //该字段返回时，app安装完成后上报，该字段是数组，需要支持多个监测地址。
                "http://example.com/installed.gif?a=1&b=2"
            ]
        }
    ],
    "ext" : {}, //视情况设置参数
    "version":"1", // 数据协议版本号
    "pt":200, // AdExchange系统内部处理花费的时间
    "reqid":"5000041.1.63168.12.1.1437104605.3459"  // 请求中带的表示本次请求的唯一ID，AdExchange返回该ID方便媒体方记录日志
}
