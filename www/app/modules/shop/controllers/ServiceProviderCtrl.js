'use strict';

angular.module('shop.module').controller('ServiceProviderCtrl',ServiceProviderCtrl );

ServiceProviderCtrl.$inject = ['$scope','$state','$rootScope','$ionicModal'];

function ServiceProviderCtrl($scope,$state,$rootScope,$ionicModal) {
    $scope.tabs = [
      {"text" : "Gallery"},
      {"text" : "Video"},
      {"text" : "Location"},
      {"text" : "Info"}
    ];

   $scope.gallery = [
        {
          "imageUrl" : "1.jpg",
          "index":0,
          "width" : 640,
          "height" : 960,
          "src" : "app/modules/shop/img/gallery/1.jpg"
        },
        {
          "imageUrl" : "2.jpg",
          "index":1,
          "width" : 640,
          "height" : 960,
          "src" : "app/modules/shop/img/gallery/2.jpg"
        },
        {
          "imageUrl" : "3.jpg",
          "index":2,
          "width" : 960,
          "height" : 640,
          "src" : "app/modules/shop/img/gallery/3.jpg"
        },
        {
          "imageUrl" : "4.jpg",
          "index":3,
          "width" : 640,
          "height" : 960,
          "src" : "app/modules/shop/img/gallery/4.jpg"
        },
        {
          "imageUrl" : "5.jpg",
          "index":4,
          "width" : 960,
          "height" : 640,
          "src" : "app/modules/shop/img/gallery/5.jpg"
        },
        {
          "imageUrl" : "6.jpg",
          "index":5,
          "width" : 640,
          "height" : 960,
          "src" : "app/modules/shop/img/gallery/6.jpg"
        },
        {
          "imageUrl" : "7.jpg",
          "index":6,
          "width" : 960,
          "height" : 640,
          "src" : "app/modules/shop/img/gallery/7.jpg"
        },
        {
          "imageUrl" : "8.jpg",
          "index":7,
          "width" : 640,
          "height" : 960,
          "src" : "app/modules/shop/img/gallery/8.jpg"
        },
        {
          "imageUrl" : "9.jpg",
          "index":8,
          "width" : 960,
          "height" : 600,
          "src" : "app/modules/shop/img/gallery/9.jpg"
        },
        {
          "imageUrl" : "10.jpg",
          "index":9,
          "width" : 600,
          "height" : 960,
          "src" : "app/modules/shop/img/gallery/10.jpg"
        },
        {
          "imageUrl" : "11.jpg",
          "index":10,
          "width" : 600,
          "height" : 960,
          "src" : "app/modules/shop/img/gallery/11.jpg"
        },
        {
          "imageUrl" : "12.jpg",
          "index":11,
          "width" : 960,
          "height" : 600,
          "src" : "app/modules/shop/img/gallery/12.jpg"
        },
        {
          "imageUrl" : "13.jpg",
          "index":12,
          "width" : 600,
          "height" : 960,
          "src" : "app/modules/shop/img/gallery/13.jpg"
        },
        {
          "imageUrl" : "14.jpg",
          "index":13,
          "width" : 600,
          "height" : 960,
          "src" : "app/modules/shop/img/gallery/14.jpg"
        },
        {
          "imageUrl" : "15.jpg",
          "index":14,
          "width" : 960,
          "height" : 640,
          "src" : "app/modules/shop/img/gallery/15.jpg"
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
     for(var i in $scope.gallery){
        if($scope.processedGallery.col_1.length > 0 && $scope.processedGallery.col_2.length>0){
          colOneHeight = getTotalHeightOfColumn($scope.processedGallery.col_1);
          colTwoHeight = getTotalHeightOfColumn($scope.processedGallery.col_2);
          if(colOneHeight <= colTwoHeight){
            $scope.processedGallery.col_1.push($scope.gallery[i]);
          }else{
            $scope.processedGallery.col_2.push($scope.gallery[i]);
          }
        }else{
          if($scope.processedGallery.col_1.length==0){
            $scope.processedGallery.col_1.push($scope.gallery[i]);
          }else{
            $scope.processedGallery.col_2.push($scope.gallery[i]);
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

  //gallery

  $scope.showImages = function(index) {
    console.log(index);
    $scope.activeSlide = index;
    $scope.showModal('app/modules/shop/templates/gallery-zoomview.html');
  };

  $scope.showModal = function(templateUrl) {
    console.log(templateUrl);
    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove()
  };

}
