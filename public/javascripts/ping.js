var app = angular.module('pingData',[]);
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

app.controller("pingDataController", ['$scope','setPingData', function($scope,setPingData){

    $scope.data={
        familyName:'',
        ip:'',
        port:'',
        pingTime:'',
        alterTime:'',
        repeatTime:''
    }

    $scope.submit=function(){
        setPingData.postData($scope.data)
    }
}]);


app.service("setPingData",['$http','$window',function($http,$window){
    return{
      postData:function(data){
    
        //alert(password.password1);
      $http({
        url: '/setPing',
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