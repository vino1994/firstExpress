const express = require('express');
// const weixin = require('weixin-api');
const router = express.Router();
const utils = require('../common/utils');
var config = require('../config/default');
const wechatapi = require('../common/wechatapi');
const xml2js = require('xml2js');

//获取,验证access_token,存入redis中
router.use(function (req, res, next) {
    //根据token从redis中获取access_token
    utils.get(config.wechat.token).then(function (data) {
        //获取到值--往下传递
        if (data) {
            return Promise.resolve(data);
        }
        //没获取到值--从微信服务器端获取,并往下传递
        else {
            return require('../common/wechatapi').updateAccessToken();
        }
    }).then(function (data) {
        console.log(data);
        //没有expire_in值--此data是redis中获取到的
        if (!data.expires_in) {
            console.log('redis获取到值');            
            req.accessToken = data;
            global.accessToken = data;
            next();
        }
        //有expire_in值--此data是微信端获取到的
        else {
            console.log('redis中无值');
			/**
			 * 保存到redis中,由于微信的access_token是7200秒过期,
			 * 存到redis中的数据减少20秒,设置为7180秒过期
			 */
            utils.set(config.wechat.token, `${data.access_token}`, 7180).then(function (result) {
                if (result == 'OK') {
                    req.accessToken = data.access_token;
                    global.accessToken = data.access_token;
                    next();
                }
            })
        }
    }).catch(function (error) {//加上catch 
        console.log(error);
    })
})

router.use(function(req, res, next){
    wechatapi.upJsapiTicket().then((data)=>{
        let res = JSON.parse(data);
        if(!!res.ticket){
            global.jsapiTicket = res.ticket;
            next();
        }
    })
})

//微信将很多事件推送到此接口
router.post('/test', function (req, res, next) {
    //微信得到返回后会通过你的认证
    res.status(200).send('wechat');
});


module.exports = router