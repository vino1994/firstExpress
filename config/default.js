module.exports = {
    port: 3000,
    session: {
        secret: 'vino',
        key: 'vino',
        maxAge: 2592000000
    },
    wechat: {
        "appID": "wxdc81871941aafe37",
        "appSecret": "b34bd87018e96b76e01e8e9a4fe89fbb",
        "token": "wechat",
        "prefix": "https://api.weixin.qq.com/cgi-bin/",
        "mpPrefix": "https://mp.weixin.qq.com/cgi-bin/"
    },
    baidu: {
        APP_ID: '11775811',
        API_KEY: '5FrsayGQa7bzhcGKI7SUYPm4',
        SECRET_KEY: 'gB9bbZoSHfsEjzFo1m6AlkRa3NDUsab5'
    }
}