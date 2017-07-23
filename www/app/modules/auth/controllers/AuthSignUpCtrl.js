'use strict';

angular.module('auth.module').controller('AuthSignUpCtrl', AuthSignUpCtrl);

AuthSignUpCtrl.$inject = ['$scope','$rootScope','$state','$stateParams','appConfig'];

function AuthSignUpCtrl($scope,$rootScope,$state,$stateParams,appConfig) {

  $scope.appConfig = appConfig;

  $scope.goBack = function () {
    $state.go('authSignIn');
  };
  $scope.openSignIn = function () {
    $state.go('authSignIn');
  }

}
