'use strict';

angular.module('auth.module').controller('AuthSignUpStep2Ctrl', AuthSignUpStep2Ctrl);

AuthSignUpStep2Ctrl.$inject = ['$scope','$rootScope','$state','$stateParams','appConfig'];

function AuthSignUpStep2Ctrl($scope,$rootScope,$state,$stateParams,appConfig) {

  $scope.appConfig = appConfig;
  if($stateParams.initialData){
    $scope.serviceProvoder = $stateParams.initialData
    console.log($scope.serviceProvoder);
  }else{
    $state.go('authSignUp');
  }


}
