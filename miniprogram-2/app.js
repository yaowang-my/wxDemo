// app.js

App({
  onLaunch() {  
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //获取同步缓存，同步与异步得方法就多了个Sync
    let storageData = wx.getStorageSync('postList')
    if(!storageData){
      //如果缓存不存在
      var dataObj = require('data/data.js')
      wx.clearStorageSync();//清除缓存
      wx.setStorageSync('postList', dataObj.postList)
    }

    //异步设置缓存
    // wx.setStorage({
    //   data: dataObj.postList,
    //   key: 'postList',
    // })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    g_isPlayingMusic:false,//全局控制音乐播放图标的状态
    g_currentMusicPostId:null,//记录的是播放哪一首歌
  }
})
