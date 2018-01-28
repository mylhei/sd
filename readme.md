# micro ssp


## 请求ｌｏｇ
 目前log会放在应用程序下的 `logs/response` 文件夹
 后续会存库

## show service
```
curl http://127.0.0.1:3000/s?ip=116.228.38.26&ua=&cid=c0536d04949be0e38550b61c8962adcf&uid=12398123123&si=2000332&rr=&app_version=2.1.0&mimes=jpg,png,gif,c,icon&v=1&device={%22udid%22:%2204078F88-BDD1-4FF3-B999-260960CB8362%22,%22identify_type%22:%22idfa%22,%22vendor%22:%22apple%22,%22model%22:%22iphone%22,%22os%22:2,%22os_version%22:%229.3.1%22,%22network%22:1,%22operator%22:0,%22density%22:2.0,%22width%22:1920,%22height%22:1080}
```

+ /s 会转发请求到fastapi
+ 返回内容会替换内容中的 imp、clk等
+ 会将唯一跳转的地址穿上本域跳转，例如 impr => http://baidu.com 会变成  `http://127.0.0.1:3000/t?u=http%3A%2F%2Fbaidu.com%2F",`
+ 会替换jsonp，自动包装jsonp请求
```
例如： curl http://127.0.0.1:3000/s?ip=116.228.38.26&ua=&cid=c0536d04949be0e38550b61c8962adcf&uid=12398123123&si=2000332&rr=&app_version=2.1.0&mimes=jpg,png,gif,c,icon&v=1&device={%22udid%22:%2204078F88-BDD1-4FF3-B999-260960CB8362%22,%22identify_type%22:%22idfa%22,%22vendor%22:%22apple%22,%22model%22:%22iphone%22,%22os%22:2,%22os_version%22:%229.3.1%22,%22network%22:1,%22operator%22:0,%22density%22:2.0,%22width%22:1920,%22height%22:1080}&jsonp=a
```


## tracking service

```
curl http://127.0.0.1:3000/t?ip=116.228.38.26&ua=&cid=c0536d04949be0e38550b61c8962adcf&uid=12398123123&si=2000332&rr=&app_version=2.1.0&mimes=jpg,png,gif,c,icon&v=1&device={%22udid%22:%2204078F88-BDD1-4FF3-B999-260960CB8362%22,%22identify_type%22:%22idfa%22,%22vendor%22:%22apple%22,%22model%22:%22iphone%22,%22os%22:2,%22os_version%22:%229.3.1%22,%22network%22:1,%22operator%22:0,%22density%22:2.0,%22width%22:1920,%22height%22:1080}&jsonp=a
```

## landing page

```
curl http://127.0.0.1:3000/t?u=baidu.com&ip=116.228.38.26&ua=&cid=c0536d04949be0e38550b61c8962adcf&uid=12398123123&si=2000332&rr=&app_version=2.1.0&mimes=jpg,png,gif,c,icon&v=1&device={%22udid%22:%2204078F88-BDD1-4FF3-B999-260960CB8362%22,%22identify_type%22:%22idfa%22,%22vendor%22:%22apple%22,%22model%22:%22iphone%22,%22os%22:2,%22os_version%22:%229.3.1%22,%22network%22:1,%22operator%22:0,%22density%22:2.0,%22width%22:1920,%22height%22:1080}&jsonp=a
```