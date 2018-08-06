const express = require('express');
const weixin = require('weixin-api');
const router = express.Router();

//微信config
router.get('/config', function (req, res) {
    // 签名成功
    if (weixin.checkSignature(req)) {
        res.status(200).send(req.query.echostr);
    } else {
        res.status(200).send('fail');
    }
});

//微信将很多事件推送到此接口上
router.post('/test', function(req, res, next) {
    //微信得到返回后会通过你的认证
    var query = req.query;   
    var echostr = query.echostr;
    res.send(echostr);
});

module.exports = router