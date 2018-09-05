const config = require('config-lite')(__dirname);
const express = require('express')
const router = express.Router();
const AipFaceClient = require("baidu-aip-sdk").face;

const client = new AipFaceClient(config.baidu.APP_ID, config.baidu.API_KEY, config.baidu.SECRET_KEY);

//人脸检测
router.post('/detect', function (req, res) {
    let options = [];
    options['face_field'] = req.body.face_field || '';
    options['max_face_num'] = req.body.max_face_num || '';
    client.detect(req.body.image, req.body.type, options).then((data) => {
        res.status(200).json(data)
    }).catch(err => {
        res.status(500).json(err)
    })
});

module.exports = router