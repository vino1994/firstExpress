/*
 *微信相关操作api
 */
var wechatApi = {};
var config = require('../config/default');
var appID = config.wechat.appID;
var appSecret = config.wechat.appSecret;
var utils = require('./utils');
var api = {
    accessToken: `${config.wechat.prefix}token?grant_type=client_credential`,
    jsapiTicket: `${config.wechat.prefix}ticket/getticket?`,
    upload: `${config.wechat.prefix}media/upload?`
}

//获取access_token
wechatApi.updateAccessToken = function () {
    var url = `${api.accessToken}&appid=${appID}&secret=${appSecret}`;
    //console.log(url);
    var option = {
        url: url,
        json: true
    };
    return utils.request(option).then(function (data) {

        return Promise.resolve(data);
    })
}

//获取jsapi_ticket
wechatApi.upJsapiTicket = function () {
    var url = `${api.jsapiTicket}access_token=${global.accessToken}&type=jsapi`;
    return utils.request(url).then(function (data) {
        return Promise.resolve(data);
    })
}

module.exports = wechatApi;
