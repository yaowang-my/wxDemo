var util = require('../util/util.js')
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
  updatePostData(option,id,data){
    
    // var itemData = this.getPostItemById(id)
   
    var postData = this.getPostItemById(id);
    
    
    var allPostData = this.getAllPostData();
    switch(option){
      case 'collect':
      
        //处理收藏
        if(!postData.collectionStatus){
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
        case 'comment':
          postData.comments.push(data)
          postData.commentNum ++
          break;
        case 'reading':
          postData.readingNum ++ ;
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

  //获取评论信息
  getCommentData(id){
    var data = this.getPostItemById(id);
    
    //按照时间降序排序
    data.comments.sort(this.compareWithTime);
    var len = data.comments.length,
      comment;
    for(var i = 0 ; i <len; i++){
      //将comment中得时间戳转换成可阅读格式
      comment = data.comments[i]
      comment.create_time = util.getDiffTime(comment.create_time,true);
    }
    return data.comments;
  }

  //
  compareWithTime(value1,value2){
    var flag= parseFloat(value1.create_time) - parseFloat(value2.create_time);
    if(flag<0){
      return 1;

    }else if(flag>0){
      return -1;
    }else{
      return 0;
    }
  }

  // 发表评论
  newComment(data,id){
    this.updatePostData('comment',id,data);
  }

  //阅读量增加1
  addReadingTimes(id){
    this.updatePostData('reading',id)
  }
}

export default DBPost