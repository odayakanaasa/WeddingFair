'use strict';

angular.module('shop.module').controller('HomeCtrl',HomeCtrl );

HomeCtrl.$inject = ['$scope','$state','$filter','$rootScope','$timeout','$mdSidenav','$log','$mdBottomSheet', '$mdToast','UserService','$ionicActionSheet','$ionicLoading'];

function HomeCtrl($scope,$state,$filter,$rootScope,$timeout,$mdSidenav,$log,$mdBottomSheet, $mdToast,UserService,$ionicActionSheet,$ionicLoading) {

  $scope.categories = [
    {
      "name":'studio',
      "providerCount":100,
      "bookmarkedCount":10,
    },{
      "name":'salon',
      "providerCount":100,
      "bookmarkedCount":10,
    },{
      "name":'fashion & design',
      "providerCount":100,
      "bookmarkedCount":10,
    },{
      "name":'decoration',
      "providerCount":100,
      "bookmarkedCount":10,
    },{
      "name":'jewellery',
      "providerCount":100,
      "bookmarkedCount":10,
    },{
      "name":'entertainment',
      "providerCount":100,
      "bookmarkedCount":10,
    },
  ]

  $scope.goServiceProvidersList = function () {
    $state.go('item-list');
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
