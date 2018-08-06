const express = require('express')
const router = express.Router()

//写个接口
router.get('/test', function (req, res) {
    let questions = [{ data: 213, num: 444, age: 12 }, { data: 456, num: 678, age: 13 }];
    res.status(200),
        res.json(questions)
});

module.exports = router