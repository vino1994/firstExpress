module.exports = {
    port: 3000,
    session: {
        secret: 'vino',
        key: 'vino',
        maxAge: 2592000000
    },
    mongodb: '',
    wechat : {
        "appID": "wxdc81871941aafe37",
        "appSecret": "b34bd87018e96b76e01e8e9a4fe89fbb",
        "token": "wechat",
        "prefix": "https://api.weixin.qq.com/cgi-bin/",
        "mpPrefix": "https://mp.weixin.qq.com/cgi-bin/"
    }
}