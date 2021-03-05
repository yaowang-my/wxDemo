class DBPost {
  constructor(
    storageKeyName,
    postId
  ){
    this.storageKeyName = 'postList'//所有文章本地缓存得键值
    this.postId = postId
  }

  //得到全部文章得信息
  getAllPostData(){
    var res = wx.getStorageSync(this.storageKeyName)
    if(!res){
      res = require('../data/data.js').postList
      this.execSetStorageSync(res);
    }
    return res;
  }

  //根据id获取内容
  getPostItemById(id){
    var dataObj = this.getAllPostData().filter((x,i)=>{
      if(x.postId == id){
        return {
          index:i,
          data:x
        }
      }else{
        return null;
      }
    })
    return dataObj[0]
  }

  //本地缓存，保存，更新
  execSetStorageSync(data){
    wx.setStorageSync(this.storageKeyName, data)


    
  }
}

export default DBPost