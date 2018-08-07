const express = require('express');
// const weixin = require('weixin-api');
const router = express.Router();
const utils = require('../common/utils');
var config = require('../config/default');
const wechatapi = require('../common/wechatapi');
const xml2js = require('xml2js');
const sha1 = require('sha1');

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


//获得jsapi_ticket
router.use(function (req, res, next) {
    wechatapi.upJsapiTicket().then((data) => {
        let res = JSON.parse(data);
        if (!!res.ticket) {
            global.jsapiTicket = res.ticket;
            next();
        }
    })
})

//签名
router.use(function (req, res, next) {
    const params = {
        nonceStr: Math.random().toString(36).substr(2, 15),
        jsapi_ticket: global.jsapiTicket,
        timestamp: parseInt(Date.now() / 1000),
        url: req.query.url
    }
    const string1 = Object.keys(params).sort().map(key => `${key.toLowerCase()}=${params[key]}`).join('&')
    const signature = sha1(string1)
    req.nonceStr = params.nonceStr;
    req.timestamp = params.timestamp;
    req.signature = signature;
    next();
})

//微信将很多事件推送到此接口
router.post('/test', function (req, res, next) {
    //微信得到返回后会通过你的认证
    res.status(200).json({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wxdc81871941aafe37', // 必填，公众号的唯一标识
        timestamp: req.timestamp, // 必填，生成签名的时间戳
        nonceStr: req.nonceStr, // 必填，生成签名的随机串
        signature: req.signature,// 必填，签名
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
        ] // 必填，需要使用的JS接口列表
    });
});


module.exports = router