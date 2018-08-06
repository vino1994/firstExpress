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

module.exports = router