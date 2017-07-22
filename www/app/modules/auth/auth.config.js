'use strict';

var authModule = angular.module('auth.module',[]);

authModule.config(function config($stateProvider,$urlRouterProvider) {
  $stateProvider
    .state('authSignIn', {
      url: '/authSignIn',
      templateUrl: 'app/modules/auth/templates/auth-sign-in.html',
      controller: 'AuthSignInCtrl'
    })
    .state('authSignUp', {
      url: '/authSignUp',
      templateUrl: 'app/modules/auth/templates/auth-sign-up.html',
      controller: 'AuthSignUpCtrl'
    });
    $urlRouterProvider.otherwise('/home');
});