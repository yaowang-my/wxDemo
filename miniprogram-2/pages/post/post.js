// pages/post/post.js
//引用data.js,一定要用相对路径
// var dataObj = require('../../data/data.js')

//使用模拟数据库
// var dbPost = require('../../db/dbPost.js').dbPost//es5

//es6
import DBPost from '../../db/DBPost.class.js';


Page({

  /**
   * 页面的初始数据
   */
  data: {

    


  },
  onTapToDetail(event){
    var postId = event.currentTarget.dataset.postId
    console.log('postId',postId)

    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var dbpost = new DBPost()
    this.setData({
      title:'通过setDate赋值得标题',
      'content[0]':'通过setDate改变得content',//接受字符串变量作为key
      testVar:'接受data里面不存在得属性',
      postList:dbpost.getAllPostData()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady', '监听页面初次渲染完成。。。')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow', '监听页面显示。。。')

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide', '监听页面隐藏。。。')

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload', '监听页面卸载。。。')

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh', '监听用户下拉动作。。。')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom', '页面上拉触底事件的处理函数。。。')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //轮播图点击事件
  onSwiperTap(event){
    var postId = event.target.dataset.postId;
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+ postId,//221
    })
  }
  
})