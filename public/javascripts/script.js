var app = angular.module('myApp',['ngCookies']);
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
app.config(function($cookiesProvider) {
    
       $cookiesProvider.defaults.secure = false;
    
});

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



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        app.controller("homeController", ['$scope','getUsers','$rootScope','changePassword','setPingData','setToken','getTokenData','editData','getHomeData','$cookies','startPing','stopPing','deletePing',function($scope,getUsers,$rootScope,changePassword,setPingData,setToken,getTokenData,editData,getHomeData,$cookies,startPing,stopPing,deletePing,setPing){

            $scope.pingdata={
                familyName:'',
                ip:'',
                port:'',
                pingTime:'',
                repeatTime:''
            }
            $scope.editdata={
                id:'',
                familyName:'',
                ip:'',
                port:'',
                pingTime:'',
                repeatTime:''
            }
            $scope.password={
                newPassword:'',
                confirmPassword:''
            }
        
            $scope.submitPing=function(){
                $scope.token=$cookies.get('token')
                $scope.userId=$cookies.get('userId');
                $scope.pingdata.token=$scope.token;
                $scope.pingdata.userId=$scope.userId;
                //alert($rootScope.apple);
              // alert(JSON.stringify($scope.pingdata));
                setPingData.postData($scope.pingdata)
            }

            $scope.tokendata={
                token:'',
                userId:'',
                tokenId:'',
                chatId:''
            }
        
            $scope.submitToken=function(){
                $scope.token=$cookies.get('token')
                $scope.userId=$cookies.get('userId');
                $scope.tokendata.token=$scope.token;
                $scope.tokendata.userId=$scope.userId;
               //alert(JSON.stringify($scope.tokendata));
                setToken.postData($scope.tokendata)
            }

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

            $scope.startPing=function(data){
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
            $scope.stop=function(id){
                $scope.token=$cookies.get('token')
                $scope.userId=$cookies.get('userId');
                $scope.userData={
                    id:id,
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
            $scope.setEditData=function(id,familyName,port,ip,pingTime,repeatTime){
                $scope.editdata.id=id;
                $scope.editdata.familyName=familyName;
                $scope.editdata.port=port;
                $scope.editdata.ip=ip;
                $scope.editdata.pingTime=pingTime;
                $scope.editdata.repeatTime=repeatTime;
            }

            $scope.edit=function(id){
              //  alert(JSON.stringify($scope.editdata))
                $scope.token=$cookies.get('token')
                $scope.userId=$cookies.get('userId');
                $scope.editdata.token=$scope.token;
                $scope.editdata.userId=$scope.userId;
                //alert($rootScope.apple);
              // alert(JSON.stringify($scope.pingdata));
                editData.postData($scope.editdata)
            }
            $scope.getToken=function(){
                $scope.token=$cookies.get('token')
                $scope.userId=$cookies.get('userId');
                $scope.tokendatas={
                    token:$scope.token,
                    userId:$scope.userId
                }
                //alert($scope.tokendatas);
                getTokenData.getData($scope.tokendatas).then(function(data){
                    $scope.tokendata=data;
                })
            }

            $scope.changePassword=function(){
                if(!$scope.password.newPassword){
                    passwordInvalid();
                }
                else if($scope.password.newPassword===$scope.password.confirmPassword){
                    $scope.password.token=$cookies.get('token')
                    $scope.password.userId=$cookies.get('userId');
                    
                    changePassword.postData($scope.password);
                }
                else{
                    passwordError();
                }
            }
            $scope.getUser=function(){
                $scope.token=$cookies.get('token')
                $scope.userId=$cookies.get('userId');
                $scope.userdata={
                    token:$scope.token,
                    userId:$scope.userId
                }
                getUsers.getData($scope.userdata).then(function(data){
                    $scope.users=data;
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
                        pingStart();
                        $window.location.href='/home'
                    }
                else if(resp.data==false){
                    error();
                   // alert('Destination does_not exist')
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
                    error();
                
                  }
             
                else{
                    pingStop();
                    $window.location.href='/home'
                    
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
                        error();
                    
                      }
                        else{
                            pingDelete();
                            $window.location.href='/home'
                            
                        }
                    })
                
                    }
                    
                    }
                    }]);


                app.service("setToken",['$http','$window',function($http,$window){
                    return{
                        postData:function(data){
                    
                     //   alert("password.password1");
                        $http({
                        url: 'secure-api/setToken',
                        method: "POST",
                        data: data,
                        headers: {
                                    'Content-Type': 'application/json'
                        }
                    }).then(function(resp){
                        if(resp.data.errorcode===1){
                        error();
                    
                        }
                        if(resp.data.errorcode===0){
                            status();
                        }     
                    })
                    }
                    }
                    }]);


                    app.service("setPingData",['$http','$window',function($http,$window){
                        return{
                          postData:function(data){
                        
                           // alert("password.password1");
                          $http({
                            url: 'secure-api/setPing',
                            method: "POST",
                            data: data,
                            headers: {
                                     'Content-Type': 'application/json'
                            }
                        }).then(function(resp){
                          if(resp.data.errorcode===1){
                            error();
                        
                          }
                          if(resp.data.errorcode===0){
                            status()
                            }     
                        })
                        }
                        }
                        }]);

                        app.service("editData",['$http','$window',function($http,$window){
                            return{
                              postData:function(data){
                            
                               //alert("password.pword1");
                              $http({
                                url: 'secure-api/update',
                                method: "POST",
                                data: data,
                                headers: {
                                         'Content-Type': 'application/json'
                                }
                            }).then(function(resp){
                              if(resp.data.errorcode===1){
                                error();
                            
                              }
                              if(resp.data.errorcode===0){
                                status()
                                  $window.location.href='/home'
                                }     
                            })
                            }
                            }
                        }]);


                        app.service("getTokenData",['$http','$window',function($http,$window){
                            return{
                              getData:function(data){
                            //alert(JSON.stringify(data));
                           // alert("password.password1");
                              data=$http({
                                url: 'secure-api/getTokenData',
                                method: "POST",
                                data: data,
                                headers: {
                                         'Content-Type': 'application/json'
                                }
                            }).then(function(resp){
                              if(resp.data.errorcode===1){
                                errror();
                            
                              }
                                 return resp.data;
                            })
                                return data;
                            }
                            
                            }
                            }]);

                            app.service("changePassword",['$http','$window',function($http,$window){
                                return{
                                  postData:function(data){
                                
                               //    alert("password.pword1");
                                  $http({
                                    url: 'secure-api/changepassword',
                                    method: "POST",
                                    data: data,
                                    headers: {
                                             'Content-Type': 'application/json'
                                    }
                                }).then(function(resp){
                                  if(resp.data.errorcode===1){
                                    error();
                                
                                  }
                                  if(resp.data.errorcode===0){
                                    password()

                                    }     
                                })
                                }
                                }
                            }]);

                            app.service("getUsers",['$http','$window',function($http,$window){
                                return{
                                  getData:function(data){
                                //alert(JSON.stringify(data));
                               // alert("password.password1");
                                  data=$http({
                                    url: 'secure-api/getUsers',
                                    method: "POST",
                                    data: data,
                                    headers: {
                                             'Content-Type': 'application/json'
                                    }
                                }).then(function(resp){
                                  if(resp.data.errorcode===1){
                                    errror();
                                
                                  }
                                     return resp.data;
                                })
                                    return data;
                                }
                                
                                }
                                }]);
