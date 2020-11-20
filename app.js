//app.js
App({
  globalData: {
    appid: 'wx8b1425f477a34c5c',
    secret: 'fdff1b8f98212d5eb32a076fa8e06ad4',
  },
  onLaunch: function () {
    let _this = this

    let openidValue = wx.getStorageSync('openid')

    if (openidValue !== "") {
      console.log("logined")
    } else {
      console.log("not login")
      wx.login({
        success(res) {
          if (res.code) {
            //发起网络请求
            var d = _this.globalData
            wx.request({
              url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code',
              data: {},
              method: "GET",
              success: function (res) {
                wx.setStorageSync('openid', res.data.openid);//存储openid  
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  },
})