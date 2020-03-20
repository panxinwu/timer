//app.js
let sr = require('sr-sdk-wxapp.min').init({
  appid: 'wx195745e8e342bd76', // AppID(小程序ID)
  token: 'bic83b5b70308e4028', // token是唯一必须配置的参数，代表接入凭证，详见「init接口」
  proxyPage: true,
  debug: true,
})
const defaultTime = {
  defaultWorkTime: 25,
  defaultRestTime: 5
}

App({
  sr,
  onLaunch: function() {
    let workTime = wx.getStorageSync('workTime')
    let restTime = wx.getStorageSync('restTime')
    if (!workTime) {
      wx.setStorage({
        key: 'workTime',
        data: defaultTime.defaultWorkTime
      })
    }
    if (!restTime) {
      wx.setStorage({
        key: 'restTime',
        data: defaultTime.defaultRestTime
      })
    }
  },
  onShow(options) {
    const open_id = wx.getStorageSync('open_id')
    console.log('###111', open_id)
    if (open_id) {
      sr.setUser({
        open_id,
      })
    } else {
      wx.login({
        success(res) {
          const code = res.code; //返回code
          console.log(code);
          const appId = 'wx195745e8e342bd76';
          const secret = '000be1edde1aa0febb6fc658fe2597da';
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
            data: {},
            header: {
              'content-type': 'json'
            },
            success: function (res) {
              const open_id = res.data.openid //返回openid
              console.log('###222', open_id)
              wx.setStorage({
                key: 'open_id',
                data: open_id
              })
              sr.setUser({
                open_id,
              })
            }
          })
        }
      })
    }
   
  },
})
