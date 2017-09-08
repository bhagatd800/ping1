
var request = require('request');
var ping = require('ping-net');
var moment = require('moment');
var PingData = require('../models/pingData');
var interval=new Array();
var postion=0;
var status;
var a=0;
var b=0;
var upTime;
var downTime;
module.exports.startPing=function(datas,message,tokenId,chatId,repeatTime,pingTime,cb){
   if(!pingTime){
       pingTime=100000000;
   }
   console.log(pingTime);
    var pingTime=parseInt(pingTime);

    for(i=0;i<=10000;i++){
        if(!interval[i]){
            position=i;
            break;
        }
    }
    ping.ping([
              { address:datas.address, port:datas.port}
              ], function(data) {

        if(!data[0].avg){
            status=false;
            request('http://api.telegram.org/bot'+tokenId+'/sendmessage?chat_id='+chatId+'&text=Status:Down\n'+datas.familyName +' ('+datas.address+')'+ 'is not available', function (error, response, body){})
        }

        else{
            PingData.setStatus(datas.id,position,function(err,data){

                if(err){
                 //   console.log("error")
                }
                else{
                 //   console.log(data);
                }

            })
            var time=moment().format('MMMM Do YYYY, h:mm:ss a');
            request('http://api.telegram.org/bot'+tokenId+'/sendmessage?chat_id='+chatId+'&text=Status:Up\nPing has started for '+datas.familyName+' ('+datas.address+') '+'on '+time, function (error, response, body){})
            
            status= true;

            interval[position]=setInterval(function() {
                
                ping.ping([
                    { address:datas.address, port:datas.port}
                    ], function(dat) {
            if(!dat[0].avg){
                var time=moment().format('MMMM Do YYYY, h:mm:ss a');
                request('http://api.telegram.org/bot'+tokenId+'/sendmessage?chat_id='+chatId+'&text=Status:Down\n'+datas.familyName +' ('+datas.address+') '+'is down '+time, function (error, response, body){})
           
                b=1;
            }

            if(dat[0].avg<pingTime){
                b=0;
            }
            if(dat[0].avg>pingTime){
                b=0;
                var time=moment().format('MMMM Do YYYY, h:mm:ss a');
               request('http://api.telegram.org/bot'+tokenId+'/sendmessage?chat_id='+chatId+'&text=Status:Time\n'+datas.familyName+' ('+datas.address+') '+'has taken longer than '+ pingTime+' on '+ time, function (error, response, body){})
            }

            if(a==0&&b==1){
                downTime=moment().format('MMMM Do YYYY, h:mm:ss a');
                a=1;
            }
            if(a==1&&b==0){

                upTime=moment().format('MMMM Do YYYY, h:mm:ss a');
                var dif=moment.utc(moment(upTime,"MMMM Do YYYY, h:mm:ss a").diff(moment(downTime,"MMMM Do YYYY, h:mm:ss a"))).format("HH:mm:ss");
                request('http://api.telegram.org/bot'+tokenId+'/sendmessage?chat_id='+chatId+'&text=Status:Up\n'+datas.familyName +' ('+datas.address+') '+' is now available '+upTime+'.The server was down for '+dif, function (error, response, body){})
                a=0;
            }

        })
    
        },repeatTime);
        }
        cb(status);
    });



}

module.exports.stopPing=function(tokenId,chatId,pos,id,familyName,cb){
    var time=moment().format('MMMM Do YYYY, h:mm:ss a');
    request('http://api.telegram.org/bot'+tokenId+'/sendmessage?chat_id='+chatId+'&text=Ping has been stoped for '+familyName+' on '+time, function (error, response, body){})
  clearInterval(interval[pos]);
  PingData.changeStatus(id,function(err,data){
    
                    if(err){
                        console.log("error")
                    }
                    else{
                        console.log(data);
                    }
    
                })
interval[pos]=null
  status=true;
 cb(status);
}