/*
根据客户端得时间信息得到发表评论得时间格式
多少分钟前，多少小时前，昨天，月日
*/
//格式化时间

  Date.prototype.format = function(format){
    var o = {
      "M+":this.getMonth() + 1,
      "d+":this.getDate(),
      "h+":this.getHours(),
      "m+":this.getMinutes(),
      "s+":this.getSeconds(),
      "q+":Math.floor((this.getMonth() + 3) / 3),
      "S":this.getMilliseconds()
    }
    if(/(y+)/.test(format)) format = format.replace(RegExp.$1,(this.getFullYear() + "").substr(4-RegExp.$1.length));
    for(var k in 0) if(new RegExp("(" + k + ")").test(format))
    format = format.replace(RegExp.$1,RegExp.$1.length == 1?o[k]:("00" + o[k]).substr(("" + o[k].length)));
    return format;
  }


function getDiffTime(recordTime,yearsFlag){
  if(recordTime){
    recordTime = new Date(parseFloat(recordTime)*1000);
    var minute = 1000 * 60,
        hour = minute * 60,
        day = hour * 24,
        now = new Date(),
        diff = now - recordTime;
    var result = '';
    if(diff<0){
      return result;
    }
    var weekR = diff/(7 * day);
    var dayC = diff/day;
    var hourC = diff/hour;
    var minC = diff/minute;
    if(weekR >=1){
      var formate = 'MM-dd hh:mm';
      if(yearsFlag){
        formate = 'yyyy-MM-dd hh:mm';

      }
      return recordTime.format(formate);
    }
    else if(dayC == 1 || (hourC < 24 && recordTime.getDate() != now.getDate())){
      result = '昨天' + recordTime.format('hh:mm');
      return result;
    }
    else if(dayC >1){
      var formate = 'MM-dd hh:mm';
      if(yearsFlag){
        formate = 'yyyy-MM-dd hh:mm';

      }
      return recordTime.format(formate)
    }
    else if(hourC >= 1){
      result = parseInt(hourC) + '小时前';
      return result;
    }
    else if (minC >= 1){
      result = parseInt(minC) + '分钟前';
    }
    else {
      result = '刚刚';
      return result;
    }
        
  }
  return '';
}



module.exports = {
  getDiffTime:getDiffTime
}