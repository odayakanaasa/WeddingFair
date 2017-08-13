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
    })
    .state('authSignUpStep2', {
      url: '/authSignUpStep2',
      templateUrl: 'app/modules/auth/templates/auth-sign-up-step-2.html',
      controller: 'AuthSignUpStep2Ctrl'
    });
    $urlRouterProvider.otherwise('/home');
});
