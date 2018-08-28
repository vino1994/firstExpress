'use strict';
const mysql = require('mysql');
//数据库连接
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    post: '3306',
    password: "qweasdzxc123",
    database: 'nodejsdemo'
});
connection.connect((err) => {
    if (err) {
        console.info(err)
    } else {
        console.info('连接成功')
    }
});
//数据库的CRUD语句
const selectAllAql = 'select * from test_tbl';
const selectOneAql = 'select * from userMag where uname like ? ';
const insertSql = 'select into userMag (uname,uphone,age) values (?,?,?)';
const delSql = 'delete from userMag where uid = ?';
const updateSql = 'update userMag ser uname = ?,uphone = ?,age =? where uid = ?';
//执行sql语句
connection.query(selectAllAql, (err, res) => {
    if (err) {
        console.info(err)
        return
    }else{
        console.info(res)
    }
})