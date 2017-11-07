'use strict';

angular.module('auth.module').controller('AuthSignUpStep2Ctrl', AuthSignUpStep2Ctrl);

AuthSignUpStep2Ctrl.$inject = ['$scope','$rootScope','$state','$stateParams','appConfig','httpService','serverConfig'];

function AuthSignUpStep2Ctrl($scope,$rootScope,$state,$stateParams,appConfig,httpService,serverConfig) {

  $scope.appConfig = appConfig;

  if($stateParams.initialData){
    $scope.serviceProvider = $stateParams.initialData
  }else{
    $state.go('authSignUp');
  }

  $scope.createServiceProvider = function () {
    console.log($scope.serviceProvider)
    var req = {
      "loginName": $scope.serviceProvider.email,
      "password": $scope.serviceProvider.password,
      "name": $scope.serviceProvider.companyName,
      "ownerName": $scope.serviceProvider.name,
      "regNumber": $scope.serviceProvider.reqNumber,
      "cityId": 0,
      "addressLine1": $scope.serviceProvider.addressLine1,
      "addressLine2": $scope.serviceProvider.addressLine2,
      "mobile": $scope.serviceProvider.contact,
      "telephone": $scope.serviceProvider.fixedLine,
      "email": $scope.serviceProvider.email,
      "instagram": $scope.serviceProvider.website,
      "facebook": $scope.serviceProvider.facebook,
      "serviceProviderCategoryId": $scope.serviceProvider.serviceProviderCategoryId
    };
    var extended_url = '/service_provider_service';
    httpService.postRequest(serverConfig.clientAPI,extended_url,req,{}).then(function(response){
      if(response.status === 200){
       console.log(response);
      }
    });
  }

  init();

  function init(){

  }

}
