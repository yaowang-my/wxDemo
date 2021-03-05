Page({
  onUnload(event){
    console.log('page is unload')
  },
  onHide(event){
    console.log('page is hide')
  },
  
  onTapJump(){
    //跳转并卸载之前welcome页面 redirectTo,执行onUnload
    //跳转能够返回之前welcome页面 navigateTo 左上角有返回 ，执行onHide
    wx.navigateTo({
      url: '../post/post',
      success(){
        console.log('jump success')
      },
      fail(){
        console.log('jump fail')
      },
      complete(){
        console.log('jump complete')
      }
    })
  }
})