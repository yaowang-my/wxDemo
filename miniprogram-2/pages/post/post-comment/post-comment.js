// pages/post/post-comment/post-comment.js
import DBPost from '../../../db/DBPost.class.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //控制使用键盘还是语音
    useKeyboardFlag: true,
    //控制input组件的初始值
    keyboardInputValue: '',
    //控制是否使用图片选择面板
    sendMoreMsgFlag: false,
    //保存已经选择的照片
    chooseFiles: [],
    deleteIndex: -1,
    currentAudio: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.dbPost = new DBPost();
    this.postId = options.id;
    var comments = this.dbPost.getCommentData(postId);
    this.setData({
      comments:comments
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },

  previewImg(event){
    //获取评论序号
    var commentIdx = event.currentTarget.dataset.commentIdx,
    //获取图片在图片数组中得序号
      imgIdx = event.currentTarget.dataset.imgIdx,
      //获取评论得全部图片
      imgs = this.data.comments[commentIdx].content.img;
      wx.previewImage({
        current:imgs[imgIdx],//当前显示图片得http链接
        urls: imgs,//需要预览的图片http链接列表
        
      })
  },
  //切换语音和键盘输入
  switchInputType(event){
    this.setData({
      useKeyboardFlag:!this.data.useKeyboardFlag
    })
  },
  //获取用户输入
  bindCommentInput(event){
    var val = event.detail.value;
    // console.log(val)
    // var pos = event.detail.cursor;
    // if(pos != -1){
    //   //光标在中间
    //   var left = event.detail.value.slice(0,pos);
    //   console.log('lefg',left)
    //   //计算光标的位置
    //   pos = left.replace(/qq/g,'*').length;
    // }

    
    // //直接返回对象，可以对输入进行过滤处理,同时可以控制光标的位置
    // return {
    //   value:val.replace(/qq/g,'*'),
    //   cursor:pos,
      
    // }

    this.data.keyboardInputValue = val
    
  },
  //提交用户评论
  submitComment(event){
    var imgs = this.data.chooseFiles;
    console.log('imgs',imgs)
    var newData= {
      username:'曜星辰',
      avatar:'/images/avatar/lol.jpg',
      //评论时间
      create_time:new Date().getTime()/1000,
      //评论内容
      content:{
        txt:this.data.keyboardInputValue,
        img:imgs
      }
    }

    if(!newData.content.txt && newData.content.img.length == 0){
      //没有评论, 不执行
      wx.showToast({
        title: '不能发送空白信息',
        duration:1000,
        icon:'none'
      })
      return ;  
    }
    //保存评论道缓存
    this.dbPost.newComment(newData,this.postId)
    //显示操作结果
    this.showCommentSuccessToast();
    //重新渲染并绑定所有评论
    this.bindCommentData();
    //恢复初始状态
    this.resetAllDefaultStatus();
  },
  //评论成功
  showCommentSuccessToast(){
    //显示操作结果
    wx.showToast({
      title: '评论成功',
      duration:1000,
      icon:'success'
    })
  },
  
  //重新绑定数据
  bindCommentData(){
    var comments = this.dbPost.getCommentData(this.postId);
    //绑定数据
    this.setData({
      comments:comments
    })
  },
  //将所有相关的按钮状态、输入状态都恢复到初始化
  resetAllDefaultStatus(){
    //清空评论框
    this.setData({
      keyboardInputValue:'',
      chooseFiles:[],
      sendMoreMsgFlag:false
    })
  },
  //显示选择照片，拍照等按钮
  sendMoreMsg(){
    this.setData({
      sendMoreMsgFlag:!this.data.sendMoreMsgFlag
    })
  },
  //选择本地照片和拍照
  chooseImage(event){
    //已选择图片和数组
    var imgArr = this.data.chooseFiles
    //只能选择三张照片，包括拍照
    var leftCount = 3-imgArr.length
    if(leftCount <= 0){
      return
    }
    var sourceType = [event.currentTarget.dataset.category],
        that = this;
    wx.chooseImage({
      count: leftCount,
 
      sourceType: sourceType,
      success: (result) => {
         
        this.setData({
          chooseFiles:imgArr.concat(result.tempFilePaths)
        })
      },
      fail: (res) => {},
      complete: (res) => {},
    })

  },
  //删除已经选择的照片
  deleteImage(event){
    var index = event.currentTarget.dataset.idx,
        that = this;
     
    that.data.chooseFiles.splice(index ,1)
    that.setData({
      chooseFiles:that.data.chooseFiles
    })
  },
  //开始录音
  recordStart(){
    var that = this
    this.setData({
      recodingClass:'recoding'
    })
    //记录录音开始时间
    this.startTime = new Date()
    // 注意，录音等需要用户授权，一定要处理用户拒绝授权
    wx.startRecord({
      success: (res) => {
        //计算录音时常
        var diff = (that.endTime - that.startTime) /1000;
        diff = Math.ceil(diff)
        //发送录音
        that.submitVoiceComment({
          url:res.tempFilePath,timeLen:diff
        })
      },
      fail(res){
        //用户授权拒绝
        console.log('fail',res)
      },
      complete(res){
        console.log('complete',res)
      }
    })
  },
  //结束录音
  recordEnd(){
    this.setData({
      recodingClass:''
    })
    this.endTime = new Date();
    wx.stopRecord({
      success: (res) => {},
    })
  },
  //提交录音
  submitVoiceComment(audio){
    var newData = {
      username:'虞姬',
      avatar:'/images/avatar/yuji.jpg',
      create_time:new Date().getTime()/1000,
      content:{
        txt:'',
        img:[],
        audio:audio
      }
    }
    //保存评论道缓存数据库
    this.dbPost.newComment(newData)
    //显示操作结果
    this.showCommentSuccessToast();
    //重新渲染并绑定所有评论
    this.bindCommentData()
  },
  //语音评论操作
  playAudio(event){
    var url = event.currentTarget.dataset.url,
        that = this;
    //暂停当前录音
    if(url == this.data.currentAudio){
      wx.pauseVoice({
        success: (res) => {},
      })
      this.data.currentAudio = ''
    }else{
      this.data.currentAudio = url
      wx.playVoice({
        filePath: url,
        complete(){
          //只有当录音播放完毕后才会执行
          that.data.currentAudio = ''
        }
      })
    }
  }


  
})