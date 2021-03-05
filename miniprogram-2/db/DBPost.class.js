class DBPost {
  constructor(
    storageKeyName
  ){
    this.storageKeyName = 'postList'//所有文章本地缓存得键值
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


  //本地缓存，保存，更新
  execSetStorageSync(data){
    wx.setStorageSync(this.storageKeyName, data)

    
  }
}

export default DBPost