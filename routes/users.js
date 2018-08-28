const express = require('express')
const mysql = require('../public/mysql.js');
const router = express.Router()

let sql = 'select * from test_tbl', sqlParams = {};
//test
router.get('/test', function (req, res) {
    async function a() {
        let data = await mysql.row(sql, sqlParams);
        res.status(200);
        res.json(data);
    }
    a();
});

module.exports = router