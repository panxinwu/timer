//app.js
import sr from './sr-sdk-wxapp/index'
// app.js
const ald = require('./ald-stat/ald-stat.js')
var gdt =require('./gdtevent_wx.min.js')
console.log(gdt.init)
sr.init({
  appid: 'wx195745e8e342bd76', // AppID(小程序ID)
  token: 'bic83b5b70308e4028', // token是唯一必须配置的参数，代表接入凭证，详见「init接口」
  usePlugin: false,
  /**
   * 开启打印调试信息， 默认 false
   */
  debug: true,
  /**
   * 建议开启-开启自动代理 Page， 默认 false
   * sdk 负责上报页面的 browse 、leave、share 等事件
   * 可以使用 sr.page 代替 Page(sr.page(options))
   * 元素事件跟踪，需要配合 autoTrack: true
   */
  proxyPage: true,
    /**
   * 建议开启-开启组件自动代理， 默认 false
   * sdk 负责上报页面的 browse 、leave、share 等事件
   */
  proxyComponent: true,
  // 建议开启-是否开启页面分享链路自动跟踪
  openSdkShareDepth: true,
  // 建议开启-是否开启自动设置openID
  openAutoTrackOpenId: true,
  openAutoTrackUnionId: true,
  // 建议开启-元素事件跟踪，自动上报元素事件，入tap、change、longpress、confirm
  autoTrack: true,
})

// const gio = require("gio.min.js").default;
// gio('init', '9e0331d251f136d4', 'wx195745e8e342bd76', { version: '3.1.0', debug: false });


const defaultTime = {
  defaultWorkTime: 25,
  defaultRestTime: 5
}

App({
  sr,
  onLaunch: function() {
    let workTime = wx.getStorageSync('workTime')
    let restTime = wx.getStorageSync('restTime')
    gdt.init('1111122448', 'wx195745e8e342bd76')

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
    sr.setComponent({
      component_id: '1',
      component_name: 'test',
      component_type: '333',
      component_index: '2',
    })

    sr.setActivityInfo({
      activity_id: '1',
      activity_name: 'test',
      activity_type: '333',
      activity_index: '2',
    })
    sr.clearComponent()
  },
})
