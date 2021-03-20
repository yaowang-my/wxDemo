// pages/post/post-detail/post-detail.js

import DBPost from '../../../db/DBPost.class.js';
let app = getApp();
 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // dbPost:new DBPost()
    isPlayingMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取postId,其中id 为请求路径中得id
    var postId = options.id;
    this.postId = postId
    this.dbPost = new DBPost(postId)
    this.postData = this.dbPost.getPostItemById(postId)
    this.setData({
      post:this.postData
    })
    //每次进入detail 阅读量+1
    this.addReadingTimes()

    //监听音乐播放的情况
    this.setMusicMonitor()
    
    //初始化音乐图标的状态
    this.initMusicStatus()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //导航设置只能在onready之后(包含)设置
    wx.setNavigationBarTitle({
      title:this.postData.title
    })
    

  },
  //点赞
  onUpTap(){
    
    var newData = this.dbPost.up(this.postId);
    
    this.setData({
      'post.upStatus':newData.upStatus,
      'post.upNum':newData.upNum
    })

    
  },
  //收藏
  onCollectionTap(){
    var newData = this.dbPost.collect(this.postId);
    this.setData({
      'post.collectionStatus':newData.collectionStatus,
      'post.collectionNum':newData.collectionNum
    })
    wx.showToast({
      title:newData.collectionStatus?"收藏成功":'取消成功',//提醒得内容
      duration:1000,//自动消失时长
      icon:'success',//小图标，只能是success和loading
      mask:true//是否显示透明得蒙层，以放触摸穿透，默认未false主要事防止用户连续点击收藏按钮

    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  // onUnload: function (event) {
  //   wx.stopBackgroundAudio({
  //     success: (res) => {},
  //   })
  //   this.setData({
  //     isPlayingMusic:false
  //   })
  // },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    //分享必须返回一个object对象
    /*
    title:分享的标题，默认是小程序的名字
    desc：分享描述，默认小程序名字
    path: 分享的路径，默认是当前页面注意是以'/'开头的，也可以在path后面添加参数
    */
    return{
      title:'yxc的测试页面',
      desc:'风景',
      path:'/pages/post/post-detail/post-detail'
    }

  },

  //跳转到评论页
  onCommentTap(event){
    var id = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: '../post-comment/post-comment?id='+id,
    })
  },
  //每次进入detail,当前文章的阅读量增加1
  addReadingTimes(){
    this.dbPost.addReadingTimes(this.postId)
  },
  
  //音乐图标的切换
  onMusicTap(event){
    if(this.data.isPlayingMusic){
      //如果正在播放则暂停
      wx.pauseBackgroundAudio({
        success: (res) => {},
      })
      this.setData({
        isPlayingMusic:false
      })

      //背景音乐全局的设置
      app.globalData.g_isPlayingMusic = false

    }else{
      wx.playBackgroundAudio({
        dataUrl: this.postData.music.url,
        title:this.postData.music.title,
        coverImgUrl:this.postData.music.coverImgUrl

      })
      this.setData({
        isPlayingMusic:true//
      })
      //背景音乐全局图标的设置
      app.globalData.g_isPlayingMusic = true

      //背景音乐全局记录的哪首歌的id
      app.globalData.g_currentMusicPostId = this.postData.postId
    }

    
  },
  //监听音乐播放状态
  setMusicMonitor(){
    var that = this
    wx.onBackgroundAudioStop((res) => {
      that.setData({
        isPlayingMusic:false

      })
      //背景音乐全局的设置
    app.globalData.g_isPlayingMusic = false
    })
    wx.onBackgroundAudioPlay((res) => {
      //只是处理当前页面的播放
      if(
       app.postData.g_currentMusicPostId == that.postData.postId){
          //如果全局播放的音乐是当前文章的音乐，就将图标状态设置为正在播放
          this.setData({
            isPlayingMusic:true
            
          })
          app.globalData.g_isPlayingMusic = true
        }
    })

    wx.onBackgroundAudioPause((res) => {
      //只是处理当前页面的暂停
      if(
       app.postData.g_currentMusicPostId == that.postData.postId){
          //如果全局播放的音乐是当前文章的音乐，就将图标状态设置为正在播放
          this.setData({
            isPlayingMusic:true
            
          })
          app.globalData.g_isPlayingMusic = false
        }
    })

    wx.onBackgroundAudioPlay((res) => {
      if(
       app.postData.g_currentMusicPostId == that.postData.postId){
          //如果全局播放的音乐是当前文章的音乐，就将图标状态设置为正在播放
          this.setData({
            isPlayingMusic:true
            
          })
        }
    })

  },

  //初始化音乐图标，设置isPlayingMusic状态为全局变量
  initMusicStatus(){
    var currentPostId = this.postData.postId;
    if(app.globalData.g_isPlayingMusic
      && app.postData.g_currentMusicPostId == currentPostId){
        //如果全局播放的音乐是当前文章的音乐，就将图标状态设置为正在播放
        this.setData({
          isPlayingMusic:true
          
        })
      }else{
        this.setData({
          isPlayingMusic:false
          
        })
      }
    
  }
})