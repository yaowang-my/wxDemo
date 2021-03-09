// pages/post/post-detail/post-detail.js

import DBPost from '../../../db/DBPost.class.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // dbPost:new DBPost()
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
  onUnload: function () {

  },

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

  }
})