'use strict';

angular.module('shop.module').controller('ServiceProviderCtrl',ServiceProviderCtrl );

ServiceProviderCtrl.$inject = ['$scope','$state','$rootScope'];

function ServiceProviderCtrl($scope,$state,$rootScope) {
  $scope.tabs = [
    {"text" : "Photography"},
    {"text" : "Videography"},
    {"text" : "Preshoot"}
  ];
  $scope.goHome = function(){
    $state.go('home');
  };

  $scope.swiper = {};

  $scope.onReadySwiper = function (swiper) {

    swiper.on('slideChangeStart', function (x) {
      console.log('slide start');
    });

    swiper.on('onSlideChangeEnd', function (x) {
      console.log('slide end',x.activeIndex);
    });
  };

}
