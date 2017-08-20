'use strict';

angular.module('shop.module').controller('HomeCtrl',HomeCtrl );

HomeCtrl.$inject = ['$scope','$state','$filter','$rootScope','serverConfig','httpService','$timeout','$mdSidenav','$log','$mdBottomSheet', '$mdToast','UserService','$ionicActionSheet','$ionicLoading'];

function HomeCtrl($scope,$state,$filter,$rootScope,serverConfig,httpService,$timeout,$mdSidenav,$log,$mdBottomSheet, $mdToast,UserService,$ionicActionSheet,$ionicLoading) {

  $scope.categories = [];

  var extended_url = '/service_category_service/getServiceCategories';
  httpService.getRequest(serverConfig.clientAPI,extended_url,{}).then(function(response){
    if(response.status === 200){
      for(var i in response.data){
        $scope.categories.push({
          "categoryName":response.data[i].categoryName,
          "providerCount":100,
          "bookmarkedCount":10,
        });
      }
    }
  });

  $scope.searchEnabled = false;

  $scope.toggleSearch = function() {
    $scope.searchEnabled = !$scope.searchEnabled;
  };

  $scope.goServiceProvidersList = function (category) {
    $state.go('item-list',{"category":category});
  };

  $scope.openCategories = function (){
    $scope.close();
    $state.go('categories');
  };
  $scope.openWishList = function () {
    //$mdSidenav('right').close();
    $scope.close();
    $state.go('wish-list');
  };
  $scope.openSignIn= function () {
    $scope.close();
    $state.go('authSignIn');
  };

  $scope.toggleSideBarHome = buildToggler('right');

  function buildToggler(navID) {
    return function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }
  }
  $scope.close = function () {
    // Component lookup should always be available since we are not using `ng-if`
    $mdSidenav('right').close()
      .then(function () {
        $log.debug("close RIGHT is done");
      });
  };

  $scope.user = UserService.getUser();

}
