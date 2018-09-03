var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const config = require('config-lite')(__dirname);
const utils = require('./common/utils');
const log4js= require('./config/log4jsConfig');

var app = express();
//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With,yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

//自动记录每次请求信息，放在其他use上面
log4js.useLogger(app)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//引入routes文件夹里面的文件
require('./routes')(app)

//设置模板，views 设置了模板的位置；view engine设置了要使用的模板引擎。
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//微信签名认证
app.use(utils.sign(config.wechat))

//配置服务端口
let server = app.listen(config.port, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
})