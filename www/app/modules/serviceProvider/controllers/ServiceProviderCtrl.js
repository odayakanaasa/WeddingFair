'use strict';

angular.module('serviceProvider.module').controller('ServiceProviderHomeCtrl',ServiceProviderHomeCtrl );

ServiceProviderHomeCtrl.$inject = ['$scope','$state','$rootScope','$cordovaImagePicker', '$ionicPlatform'];

function ServiceProviderHomeCtrl($scope,$state,$rootScope,$cordovaImagePicker, $ionicPlatform) {

  $ionicPlatform.ready(function() {
    $scope.getImage = function() {
      // Image picker will load images according to these settings
      var options = {
        maximumImagesCount: 1, // Max number of selected images, I'm using only one for this example
        width: 800,
        height: 800,
        quality: 80            // Higher is better
      };
      $cordovaImagePicker.getPictures(options).then(function (results) {
        // Loop through acquired images
        console.log(results);
        for (var i = 0; i < results.length; i++) {
          $scope.collection.selectedImage = results[i];   // We loading only one image so we can use it like this
          // window.plugins.Base64.encodeFile($scope.collection.selectedImage, function(base64){  // Encode URI to Base64 needed for contacts plugin
          //   $scope.collection.selectedImage = base64;
            // $scope.addContact();    // Save contact
          // });
        }
      }, function(error) {
        console.log('Error: ' + JSON.stringify(error));    // In case of error
      });
    };

  });


}

