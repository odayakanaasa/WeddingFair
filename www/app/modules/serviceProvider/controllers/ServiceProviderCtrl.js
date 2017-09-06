'use strict';

angular.module('serviceProvider.module').controller('ServiceProviderHomeCtrl',ServiceProviderHomeCtrl );

ServiceProviderHomeCtrl.$inject = ['$scope','$state','$rootScope','$cordovaImagePicker', '$ionicPlatform'];

function ServiceProviderHomeCtrl($scope,$state,$rootScope,$cordovaImagePicker, $ionicPlatform) {
     $scope.collection = {};
     $ionicPlatform.ready(function() {
      $scope.getImage = function() {
        // Image picker will load images according to these settings
        var options = {
          maximumImagesCount: 10, // Max number of selected images, I'm using only one for this example
          width: 800,
          height: 800,
          quality: 100            // Higher is better
        };
        $cordovaImagePicker.getPictures(options).then(function (results) {
          $scope.galleryImages = results;
        }, function(error) {
          console.log('Error: ' + JSON.stringify(error));    // In case of error
        });
      };
    });


}

