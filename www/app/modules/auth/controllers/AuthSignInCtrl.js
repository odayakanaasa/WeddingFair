'use strict';

angular.module('auth.module').controller('AuthSignInCtrl', AuthSignInCtrl);

AuthSignInCtrl.$inject = ['$scope','$state','$rootScope','serverConfig','httpService'];

function AuthSignInCtrl($scope,$state,$rootScope,serverConfig,httpService) {

  $scope.user = {
    "loginName": "dinuka@gmail.com",
    "password": "1234567"
  };

  $scope.signIn = function () {
    var req = {
      "loginName": $scope.user.loginName,
      "password": $scope.user.password
    };
    var extended_url = '/service_provider_service/login';
    httpService.putRequest(serverConfig.clientAPI,extended_url,req,{}).then(function(response){
      if(response.status === 200){
        localStorage.setItem('loginStatus',true);
        var authResponse = response.data;
        localStorage.setItem('authResponse',JSON.stringify(authResponse));
        $state.go('serviceProviderHome');
      }
    });
  }

  $scope.openSignUp = function () {
    $state.go('authSignUp');
  };

}
