'use strict';

angular.module('auth.module').controller('AuthSignInCtrl', AuthSignInCtrl);

AuthSignInCtrl.$inject = ['$scope','$state','$rootScope'];

function AuthSignInCtrl($scope,$state,$rootScope) {

  $scope.openSignUp = function () {
    $state.go('authSignUp');
  };
  $scope.goHome = function () {
    $state.go('home');
  };
}
