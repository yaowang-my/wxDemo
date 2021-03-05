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