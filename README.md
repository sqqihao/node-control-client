#Requirement:
- 	nodeJS
-    mt-files-downloader
-    screenshot-desktop

#安装
-	npm install 

#客户端配置 conf.js
-	url:请求的任务地址，  返回一个JSON
-	host:域名或者IP配置
-	path:客户端返回给服务器的POST地址



#服务端配置 index.php
```http://127.0.0.1/node-mstsc/server/index.php```

#返回的数据结构：
```
{
	"command" : "dir c:",
	"screenshot" : "true",
	"download" : "https://image.uc.cn/s/uae/g/1v/wm-website-static/wm-website/hash-version/imgs/header/logo_a5979d7.png",
	"filename" : "png.png",
	"downloadAndRun" : "",
	"timeout" : "3600000"
}
```

-	command [非必须]客户端执行的命令， 数据的输出会在服务器的contents目录下
-	screenshot [非必须]请求客户端截屏
-	download [非必须]需要下载的http路径地址
-	filename [非必须]下载成功的文件重命名
-	downloadAndRun [非必须] 下载完毕并执行某程序
-	timeout [非必须] 默认重新执行的代码的时间1小时