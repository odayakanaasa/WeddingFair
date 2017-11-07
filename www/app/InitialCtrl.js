'use strict';

angular.module('weddingFair').controller('InitialCtrl',InitialCtrl);

InitialCtrl.$inject = ['$scope','$rootScope','$state','$ionicHistory','$ionicLoading','serverConfig','httpService'];

function InitialCtrl($scope,$rootScope,$state,$ionicHistory,$ionicLoading,serverConfig,httpService) {

  $rootScope.$on('$stateChangeStart', function (event,toState,toParams, fromState, fromParams) {
    $ionicLoading.show({
      template: '<ion-spinner icon="circles"></ion-spinner>',
      hideOnStateChange: true
    });

    if(!$rootScope.loginStatus || $rootScope.authResponse==null  || $rootScope.authResponse=='null' || $rootScope.authResponse=='' || $rootScope.authResponse==undefined || $rootScope.authResponse=='undefined'){
      var localAuthStatus = localStorage.getItem('loginStatus');
      if(localAuthStatus==null || localAuthStatus=='' || localAuthStatus==undefined){
        $scope.logOut(event,toState);
      }else if(JSON.parse(localAuthStatus)==true){
        var localAuthResponse = localStorage.getItem('authResponse');
        if(localAuthResponse!=null && localAuthResponse!='null' && localAuthResponse!='' && localAuthResponse!=undefined && localAuthResponse!='undefined'){
          if(JSON.parse(localAuthResponse)!=null && JSON.parse(localAuthResponse)!='' && JSON.parse(localAuthResponse)!=undefined){
            if(checkAuthUser(JSON.parse(localAuthResponse))){
              $rootScope.loginStatus = true;
              $rootScope.authResponse = JSON.parse(localAuthResponse);
            }else{
              $scope.logOut(event,toState);
            }
          }else{
            $scope.logOut(event,toState);
          }
        }else{
          $scope.logOut(event,toState);
        }
      }else{
        $scope.logOut(event,toState);
      }
    }

  });

  $rootScope.$on('$stateChangeSuccess', function () {
  });

  function checkAuthUser(authResponse){
    return authResponse.serviceProviderId != undefined && authResponse.serviceProviderId != null && authResponse.serviceProviderId != ''
      && authResponse.sessionId != undefined && authResponse.sessionId != null && authResponse.sessionId != ''
  }

  $scope.logOut = function(event,toState){
    localStorage.setItem('loginStatus',false);
    localStorage.setItem('authResponse',null);
    $rootScope.loginStatus = false;
    $rootScope.authResponse = null;
  }

}
