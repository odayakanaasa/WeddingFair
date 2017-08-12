'use strict';

angular.module('shop.module').controller('ServiceProviderCtrl',ServiceProviderCtrl );

ServiceProviderCtrl.$inject = ['$scope','$state','$rootScope'];

function ServiceProviderCtrl($scope,$state,$rootScope) {
    $scope.tabs = [
      {"text" : "Photography"},
      {"text" : "Videography"},
      {"text" : "Preshoot"}
    ];

   var gallery = [
        {
          "imageUrl" : "1.jpg",
          "width" : 640,
          "height" : 960
        },
        {
          "imageUrl" : "2.jpg",
          "width" : 640,
          "height" : 960
        },
        {
          "imageUrl" : "3.jpg",
          "width" : 960,
          "height" : 640
        },
        {
          "imageUrl" : "4.jpg",
          "width" : 640,
          "height" : 960
        },
        {
          "imageUrl" : "4.jpg",
          "width" : 640,
          "height" : 960
        },
        {
          "imageUrl" : "5.jpg",
          "width" : 960,
          "height" : 640
        },
        {
          "imageUrl" : "6.jpg",
          "width" : 640,
          "height" : 960
        },
        {
          "imageUrl" : "7.jpg",
          "width" : 960,
          "height" : 640
        },
        {
          "imageUrl" : "8.jpg",
          "width" : 640,
          "height" : 960
        },
        {
          "imageUrl" : "9.jpg",
          "width" : 960,
          "height" : 600
        },
        {
          "imageUrl" : "10.jpg",
          "width" : 600,
          "height" : 960
        },
        {
          "imageUrl" : "11.jpg",
          "width" : 600,
          "height" : 960
        },
        {
          "imageUrl" : "12.jpg",
          "width" : 960,
          "height" : 600
        },
        {
          "imageUrl" : "13.jpg",
          "width" : 600,
          "height" : 960
        },
        {
          "imageUrl" : "14.jpg",
          "width" : 600,
          "height" : 960
        },
        {
          "imageUrl" : "15.jpg",
          "width" : 960,
          "height" : 640
        }
   ];

   $scope.processedGallery = {
       "col_1" : [],
       "col_2" : []
   };

   processGallery()

   function processGallery(){
     var colOneHeight = 0;
     var colTwoHeight = 0;
     for(var i in gallery){
        if($scope.processedGallery.col_1.length > 0 && $scope.processedGallery.col_2.length>0){
          colOneHeight = getTotalHeightOfColumn($scope.processedGallery.col_1);
          colTwoHeight = getTotalHeightOfColumn($scope.processedGallery.col_2);
          if(colOneHeight <= colTwoHeight){
            $scope.processedGallery.col_1.push(gallery[i]);
          }else{
            $scope.processedGallery.col_2.push(gallery[i]);
          }
        }else{
          if($scope.processedGallery.col_1.length==0){
            $scope.processedGallery.col_1.push(gallery[i]);
          }else{
            $scope.processedGallery.col_2.push(gallery[i]);
          }
        }
     }
     console.log($scope.processedGallery);
   }

   function getTotalHeightOfColumn(imageArray){
      var height = 0;
      for(var i in imageArray){
        height += imageArray[i].height;
      }
      return height;
   };

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
