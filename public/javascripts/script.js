var app = angular.module('myApp',['ngCookies']);
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
app.config(function($cookiesProvider) {
    
       $cookiesProvider.defaults.secure = false;
    
});

app.controller("tokenController", ['$scope','setToken','$rootScope','$cookies', function($scope,setToken,$rootScope,$cookies){

    $scope.data={
        token:'',
        userId:'',
        tokenId:'',
        chatId:''
    }

    $scope.submit=function(){
        $scope.token=$cookies.get('token')
        $scope.userId=$cookies.get('userId');
        $scope.data.token=$scope.token;
        $scope.data.userId=$scope.userId;
       // alert(JSON.stringify($scope.data));
        setToken.postData($scope.data)
    }
}]);

app.service("setToken",['$http','$window',function($http,$window){
    return{
      postData:function(data){
    
        //alert(password.password1);
      $http({
        url: 'secure-api/setToken',
        method: "POST",
        data: data,
        headers: {
                 'Content-Type': 'application/json'
        }
    }).then(function(resp){
      if(resp.data.errorcode===1){
        alert("some thing went wrong please try again");
    
      }
      if(resp.data.errorcode===0){
          alert("Data saved")
        }     
    })
    }
    }
    }]);


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    app.controller("loginController", ['$scope','register','$http','$window','$cookies',function($scope,register,$http,$window,$cookies){
            $scope.data={
                userName:'',
                password:''
            }
        
            $scope.login=function(){
                $http({
                    url: '/login',
                    method: "POST",
                    data: $scope.data,
                    headers: {
                             'Content-Type': 'application/json'
                    }
                }).then(function(resp){
                  if(resp.data.errorcode===1){
                    alert("UserName Password Doesnot Match");
                
                  }
                  else{
                     $cookies.put('token',resp.data.token);
                     $cookies.put('userId',resp.data.id);
                     //alert($cookies.get('token'));
                      $window.location.href='/home';
                  }     
                })
            }
        
            $scope.register=function(){
                register.postData($scope.data);
            }
        }]);
        
        
            app.service("register",['$http','$window',function($http,$window){
                return{
                  postData:function(data){
                
                  $http({
                    url: '/register',
                    method: "POST",
                    data: data,
                    headers: {
                             'Content-Type': 'application/json'
                    }
                }).then(function(resp){
                  if(resp.data.errorcode===1){
                    alert("some thing went wrong please try again");
                
                  }
                  if(resp.data.errorcode===0){
                      alert("SUCCESSFULLY REGISTERED.PLEASE LOGIN TO CONTINUE");
                      $window.location.href='/';
                    }     
                })
                }
                }
                }]);



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////                



app.controller("pingDataController", ['$scope','setPingData','$rootScope','$cookies', function($scope,setPingData,$rootScope,$cookies){
        $scope.data={
            familyName:'',
            ip:'',
            port:'',
            pingTime:'',
            alterTime:'',
            repeatTime:''
        }
    
        $scope.submit=function(){
            $scope.token=$cookies.get('token')
            $scope.userId=$cookies.get('userId');
            $scope.data.token=$scope.token;
            $scope.data.userId=$scope.userId;
            //alert($rootScope.apple);
           // alert("deepak")
            setPingData.postData($scope.data)
        }
    }]);
    
    
    app.service("setPingData",['$http','$window',function($http,$window){
        return{
          postData:function(data){
        
            //alert(password.password1);
          $http({
            url: 'secure-api/setPing',
            method: "POST",
            data: data,
            headers: {
                     'Content-Type': 'application/json'
            }
        }).then(function(resp){
          if(resp.data.errorcode===1){
            alert("some thing went wrong please try again");
        
          }
          if(resp.data.errorcode===0){
              alert("Data saved")
            }     
        })
        }
        }
        }]);




        //////////////////////////////////////////////////////////////////////////////////////////////////////////////


        app.controller("homeController", ['$scope','setPingData','$rootScope','getHomeData','$cookies','startPing','stopPing','deletePing', function($scope,setPingData,$rootScope,getHomeData,$cookies,startPing,stopPing,deletePing){

            $scope.getData=function()
            {   //alert("deepak");
                
                $scope.token=$cookies.get('token')
                $scope.userId=$cookies.get('userId');
              //  alert($scope.token);
                $scope.userData={
                    token:$scope.token,
                    userId:$scope.userId
                }
               // alert(JSON.stringify($scope.userData));
                getHomeData.getData($scope.userData).then(function(datas){
                    
                    $scope.dataSet=datas;
                   //alert(JSON.stringify($scope.dataSet));
                })
            }
            $scope.start=function(data){
                $scope.token=$cookies.get('token')
                $scope.userId=$cookies.get('userId');
                $scope.userData={
                    token:$scope.token,
                    userId:$scope.userId,
                    id:data
                }
                //alert(JSON.stringify( $scope.userData));
                startPing.postData($scope.userData);
            }
            $scope.stop=function(){
                $scope.token=$cookies.get('token')
                $scope.userId=$cookies.get('userId');
                $scope.userData={
                    token:$scope.token,
                    userId:$scope.userId
                }
                //alert(JSON.stringify( $scope.userData));
                stopPing.postData($scope.userData);
            }

            $scope.delete=function(data){
                $scope.token=$cookies.get('token')
                $scope.userId=$cookies.get('userId');
                $scope.userData={
                    token:$scope.token,
                    userId:$scope.userId,
                    id:data
                }
                //alert(JSON.stringify( $scope.userData));
                deletePing.deleteData($scope.userData);
                getHomeData.getData($scope.userData).then(function(datas){
                    
                    $scope.dataSet=datas;
                 //  alert(JSON.stringify($scope.dataSet));
                })
            
            }

        }]);

        app.service("getHomeData",['$http','$window',function($http,$window){
            return{
              getData:function(data){
            //alert(JSON.stringify(data));
                //alert(password.password1);
              data=$http({
                url: 'secure-api/getData',
                method: "POST",
                data: data,
                headers: {
                         'Content-Type': 'application/json'
                }
            }).then(function(resp){
              if(resp.data.errorcode===1){
                alert("some thing went wrong please try again");
            
              }
                 return resp.data;
            })
                return data;
            }
            
            }
            }]);


            app.service("startPing",['$http','$window',function($http,$window){
                return{
                  postData:function(data){
                //alert(JSON.stringify(data));
                    //alert(password.password1);
                  data=$http({
                    url: 'secure-api/sendPing',
                    method: "POST",
                    data: data,
                    headers: {
                             'Content-Type': 'application/json'
                    }
                }).then(function(resp){
                   // alert(resp.data);
                  if(resp.data.errorcode===1){
                    alert("some thing went wrong please try again");
                
                  }
                 else if(resp.data==true){
                       // alert(resp.data);
                        alert('ping started')
                    }
                else if(resp.data==false){
                    alert('Destination does_not exist')
                }
                })
                
                }
                
                }
                }]);


                
            app.service("stopPing",['$http','$window',function($http,$window){
                return{
                  postData:function(data){
                //alert(JSON.stringify(data));
                    //alert(password.password1);
                  data=$http({
                    url: 'secure-api/stopPing',
                    method: "POST",
                    data: data,
                    headers: {
                             'Content-Type': 'application/json'
                    }
                }).then(function(resp){
                  if(resp.data.errorcode===1){
                    alert("some thing went wrong please try again");
                
                  }
             
                else{
                    alert('Ping Stoped')
                }
                })
                
                }
                
                }
                }]);

                app.service("deletePing",['$http','$window',function($http,$window){
                    return{
                      deleteData:function(data){
                    //alert(JSON.stringify(data));
                        //alert(password.password1);
                      data=$http({
                        url: 'secure-api/deleteData',
                        method: "POST",
                        data: data,
                        headers: {
                                 'Content-Type': 'application/json'
                        }
                    }).then(function(resp){
                      if(resp.data.errorcode===1){
                        alert("some thing went wrong please try again");
                    
                      }
                        else{
                            alert('Deleted Successfully');
                            $window.location.href='/home'
                        }
                    })
                
                    }
                    
                    }
                    }]);