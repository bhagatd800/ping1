var app = angular.module('login',[]);
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

app.controller("loginController", ['$scope','login','register', function($scope,login,register){

    $scope.data={
        userName:'',
        password:''
    }

    $scope.login=function(){
        login.postData($scope.data);
    }

    $scope.register=function(){
        register.postData($scope.data);
    }
}]);


app.service("login",['$http',function($http){
    
    return{
      postData:function(data){
    
        //alert(password.password1);
      $http({
        url: '/login',
        method: "POST",
        data: data,
        headers: {
                 'Content-Type': 'application/json'
        }
    }).then(function(resp){
      if(resp.data.errorcode===1){
        alert("UserName Password Doesnot Match");
    
      }
      if(resp.data.errorcode===0){
          $window.location.href='/home.jade';
        }     
    })
    
    }
    }}]);


    app.service("register",['$http','$window',function($http,$window){
        return{
          postData:function(data){
        
            //alert(password.password1);
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
        