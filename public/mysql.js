'use strict';
const mysql = require("mysql");

let pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'qweasdzxc123',
    database: 'nodejsdemo',
    multipleStatements: true    //是否允许执行多条sql语句
})

//将结果已对象数组返回
let row = (sql, ...params) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return
            }
            connection.query(sql, params, (error, res) => {
                connection.release();
                if (error) {
                    reject(error);
                    return
                }
                resolve(res);
            })
        })
    })
}

//返回一个对象
let first = (sql, ...params) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return
            }
            connection.query(sql, params, (error, res) => {
                connection.release();
                if (error) {
                    reject(error);
                    return
                }
                resolve(res[0] || null);
            })
        })
    })
}

//返回单个查询结果
let single = (sql, ...params) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
                return
            }
            connection.query(sql, params, function (error, res) {
                connection.release();
                if (error) {
                    reject(error);
                    return
                }
                for (let i in res[0]) {
                    resolve(res[0][i] || null);
                    return
                }
                resolve(null);
            })
        })
    })
}

//执行代码，返回执行结果
let execute = (sql, ...params) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return
            }
            connection.query(sql, params, (error, res) => {
                connection.release();
                if (error) {
                    reject(error);
                    return
                }
                resolve(res);
            })
        })
    })
}

module.exports = {
    row: row,
    first: first,
    single: single,
    execute: execute
}