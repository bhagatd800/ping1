var tcpp = require('tcp-ping');
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
   // console.log(datas);
    var pingTime=parseInt(pingTime);

  //  console.log(a);
   // clearInterval(interval);
    for(i=0;i<=10000;i++){
        if(!interval[i]){
            position=i;
            break;
        }
    }
    ping.ping([
              { address:datas.address, port:datas.port}
              ], function(data) {
      //   console.log(data);
      //   console.log(data[0].avg);
        if(!data[0].avg){
            status=false;
         //   console.log('not available');
            request('http://api.telegram.org/bot'+tokenId+'/sendmessage?chat_id='+chatId+'&text=Status:Down\n'+datas.familyName +' ('+datas.address+')'+ 'is not available', function (error, response, body){})
        }

        else{
         //   console.log('available');
            PingData.setStatus(datas.id,position,function(err,data){

                if(err){
                 //   console.log("error")
                }
                else{
                 //   console.log(data);
                }

            })
            var time=moment().format('MMMM Do YYYY, h:mm:ss a');
            request('http://api.telegram.org/bot'+tokenId+'/sendmessage?chat_id='+chatId+'&text=Status:Up\nPing has started for '+datas.familyName+' ('+datas.address+') '+'at '+time, function (error, response, body){})
            
            status= true;

            interval[position]=setInterval(function() {
                
             //   console.log(a);
                ping.ping([
                    { address:datas.address, port:datas.port}
                    ], function(dat) {
             //  console.log(dat);
            if(!dat[0].avg){
                downTime=moment().format('MMMM Do YYYY, h:mm:ss a');
                //a=1;
                request('http://api.telegram.org/bot'+tokenId+'/sendmessage?chat_id='+chatId+'&text=Status:Down\n'+datas.familyName +' ('+datas.address+') '+'is down '+downTime, function (error, response, body){})
           
                b=1;
              //  console.log("no longer available");
            }
            // if(!datas.pingTime){
            //     b=0;
            //   //  console.log("dsa");
            // }
            if(dat[0].avg<pingTime){
                b=0;
               // console.log(datas.familyName);
            }
            if(dat[0].avg>pingTime){
                b=0;
                var time=moment().format('MMMM Do YYYY, h:mm:ss a');
               // console.log("abc");
               request('http://api.telegram.org/bot'+tokenId+'/sendmessage?chat_id='+chatId+'&text=Status:Time\n'+datas.familyName+' ('+datas.address+') '+'has taken longer than '+ pingTime+' at '+ time, function (error, response, body){})
            }

            if(a==0&&b==1){
               // downTime=moment().format('MMMM Do YYYY, h:mm:ss a');
                a=1;
              //  request('http://api.telegram.org/bot'+tokenId+'/sendmessage?chat_id='+chatId+'&text=Status:Down\n'+datas.familyName +' ('+datas.address+') '+'is down '+downTime, function (error, response, body){})
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
        //console.log(status)
        cb(status);
    });



}

module.exports.stopPing=function(tokenId,chatId,pos,id,familyName,cb){
    var time=moment().format('MMMM Do YYYY, h:mm:ss a');
    request('http://api.telegram.org/bot'+tokenId+'/sendmessage?chat_id='+chatId+'&text=Ping has been stoped for '+familyName+' at '+time, function (error, response, body){})
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