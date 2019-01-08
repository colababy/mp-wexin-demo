# nodejs_mp_wexin
微信公众号开发Nodejs版demo

### 运行环境
本工程使用nodejs开发

### 配置
修改./routes/wechat.js中config的定义
```
var config = {
	token: '微信后台配置的token',
	appid: '微信公众号APPID',
	encodingAESKey: '微信后台查看到的AESKey'
};
```
### 提醒
由于个人只能申请微信订阅号，而订阅号的API权限较少，因为可以使用开发者测试号。 

关于微信公众号的后台操作，访问[微信公众号平台](http://mp.weixin.com)去看吧
