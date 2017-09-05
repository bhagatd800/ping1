var tcpp = require('tcp-ping');
var request = require('request');
var ping = require('ping-net');
var interval;
var status;
var a=0;
var b=0;
module.exports.startPing=function(datas,message,tokenId,chatId,repeatTime,pingTime,cb){
    
    var pingTime=parseInt(pingTime);
    clearInterval(interval);

 
    ping.ping([
              { address:datas.address, port:datas.port}
              ], function(data) {
         console.log(data);
         console.log(data[0].avg);
        if(!data[0].avg){
            status=false;
            request('http://api.telegram.org/bot'+tokenId+'/sendmessage?chat_id='+chatId+'&text=Not Available', function (error, response, body){})
        }

        else{
            request('http://api.telegram.org/bot'+tokenId+'/sendmessage?chat_id='+chatId+'&text=Ping has started for '+datas.address, function (error, response, body){})
            
            status= true;

            interval=setInterval(function() {
                ping.ping([
                    { address:datas.address, port:datas.port}
                    ], function(dat) {
               console.log(dat);
            if(!dat[0].avg){
                b=1;
                console.log("no longer available");
            }
            if(dat[0].avg<pingTime){
                b=0;
            }
            if(dat[0].avg>pingTime){
                b=0;
               request('http://api.telegram.org/bot'+tokenId+'/sendmessage?chat_id='+chatId+'&text=Ping has taken longer than '+ pingTime, function (error, response, body){})
            }

            if(a==0&&b==1){
                a=1;
                request('http://api.telegram.org/bot'+tokenId+'/sendmessage?chat_id='+chatId+'&text=Not Available', function (error, response, body){})
            }
            if(a==1&&b==0){
                request('http://api.telegram.org/bot'+tokenId+'/sendmessage?chat_id='+chatId+'&text=Now Available', function (error, response, body){})
                a=0;
            }

        })
    
        },repeatTime);
        }
        console.log(status)
        cb(status);
    });



}

module.exports.stopPing=function(tokenId,chatId,cb){
    request('http://api.telegram.org/bot'+tokenId+'/sendmessage?chat_id='+chatId+'&text=Ping has been stoped.', function (error, response, body){})
  clearInterval(interval);
  status=true;
 cb(status);
}