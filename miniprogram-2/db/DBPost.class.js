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
  //收藏文章
  collect(id){
    return this.updatePostData('collect',id);
  }
  //更新本地得收藏，点赞，评论，阅读量
  updatePostData(option,id){
    
    // var itemData = this.getPostItemById(id)
    // console.log('itemData',itemData)
    var postData = this.getPostItemById(id);
    
    
    var allPostData = this.getAllPostData();
    switch(option){
      case 'collect':
        //处理收藏
        if(!postData.collectStatus){
          //未收藏
          postData.collectionNum++;
          postData.collectionStatus = true;
        }else{
          //收藏过
          postData.collectionNum--;
          postData.collectionStatus = false;
        }
        break;
        case 'up':
          if(!postData.upStatus){
            postData.upNum ++;
            postData.upStatus = true
          }else{
            postData.upNum --;
            postData.upStatus = false
          }
          break;
        
    }
    var index = allPostData.findIndex((x)=>x.postId == id)
    allPostData[index] = postData
    this.execSetStorageSync(allPostData)
    return postData;
  }
  

  //点赞或者取消点赞
  up(id){
     
    var data = this.updatePostData('up',id);
 
    return data;
  }
}

export default DBPost