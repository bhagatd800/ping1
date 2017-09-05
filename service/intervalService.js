var tcpp = require('tcp-ping');
var request = require('request');
var ping = require('ping-net');
var interval;
var status;
module.exports.startPing=function(datas,message,tokenId,chatId,repeatTime,pingTime,cb){
    console.log("deepak")
    clearInterval(interval);

 
    ping.ping([
              { address:datas.address, port:datas.port}
              ], function(data) {
                  console.log(datas);
        if(data.avg==null){
            status=false;
            
           // request('http://api.telegram.org/bot'+tokenId+'/sendmessage?chat_id='+chatId+'&text=Not Available', function (error, response, body){})
        }

        else{
            interval=setInterval(function() {
           // request('http://api.telegram.org/bot'+tokenId+'/sendmessage?chat_id='+chatId+'&text=Ping has started for '+datas.address, function (error, response, body){})
            if(data.avg>pingTime){
                consloe.log("deepak");
             //   request('http://api.telegram.org/bot'+tokenId+'/sendmessage?chat_id='+chatId+'&text=Ping has taken longer than '+ pingTime, function (error, response, body){})
            }
            else{
                console.log("deepak kumar")
            }
        },repeatTime);
        }
    });

   




    // ping.sys.probe(datas.address, function(available) {
    //      if(available){
    //         status=true
    //       //  request('http://api.telegram.org/bot'+tokenId+'/sendmessage?chat_id='+chatId+'&text=Ping has started for '+datas.address, function (error, response, body){})
    //          interval=setInterval(function() {
    //            // console.log(repeatTime);
    //             ping.promise.probe('192.187.127.76:80').then(function(res) {
    //                 console.log(res);
    //                 console.log(res.alive);
    //                 if(res.alive){
    //                     console.log(res.time)
    //                     console.log(pingTime);
    //                     if(res.time>pingTime){
    //                         console.log("deepak");
    //                     // request('http://api.telegram.org/bot'+tokenId+'/sendmessage?chat_id='+chatId+'&text=Ping has taken longer than '+ pingTime, function (error, response, body){})

    //                     }
    //                 }

    //         });
                 
    //          }, repeatTime);
             
    //         }
    //     else{
    //     request('http://api.telegram.org/bot'+tokenId+'/sendmessage?chat_id='+chatId+'&text=Not Available', function (error, response, body){})
    //          console.log("doesnot exist");
    //          status=false
    //         }
    //         console.log("deepak")
    //         console.log(status);
    //     cb(status);
    // });

}

module.exports.stopPing=function(tokenId,chatId,cb){
    request('http://api.telegram.org/bot'+tokenId+'/sendmessage?chat_id='+chatId+'&text=Ping has been stoped.', function (error, response, body){})
  clearInterval(interval);
  status=true;
 cb(status);
}