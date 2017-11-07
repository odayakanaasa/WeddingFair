'use strict';

angular.module('serviceProvider.module').controller('ServiceProviderHomeCtrl',ServiceProviderHomeCtrl );

ServiceProviderHomeCtrl.$inject = ['$scope','$state','$rootScope','$cordovaImagePicker', '$ionicPlatform','$ionicLoading','$cordovaDevice','$cordovaFile','$cordovaFileTransfer'];

function ServiceProviderHomeCtrl($scope,$state,$rootScope,$cordovaImagePicker, $ionicPlatform,$ionicLoading,$cordovaDevice,$cordovaFile,$cordovaFileTransfer) {
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
          // $scope.galleryImages = results;
          for(var i in results){
            uploadImages(results[i]);
            // var currentName = results[i].replace(/^.*[\\\/]/, '');
            // var d = new Date();
            // var n = d.getTime();
            // var newFileName =  n + '_'+ i + "."+currentName.split('.')[currentName.split('.').length -1];
            // if ($cordovaDevice.getPlatform() == 'Android') {
            //   window.FilePath.resolveNativePath(results[i], function(entry) {
            //       window.resolveLocalFileSystemURL(entry,  function (fileEntry) {
            //       var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
            //       $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success){
            //         console.log(newFileName);
            //         // uploadImage(newFileName);
            //       }, function(error){
            //         $scope.showAlert('Error', error.exception);
            //       });
            //     },  function(e) {
            //       console.error('Error: ', e);
            //     });
            //   });
            // } else {
            //   var namePath = results[i].substr(0, results[i].lastIndexOf('/') + 1);
            //   $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function(success){
            //      uploadImage(newFileName);
            //   }, function(error){
            //     $scope.showAlert('Error', error.exception);
            //   });
            // }
          }

        }, function(error) {
          console.log('Error: ' + JSON.stringify(error));    // In case of error
        });
      };
    });

  function uploadImages(fileURL){
    // var ImageService = serviceLocator.serviceList.IDImage;
    // var extended_url = '/GalleryImageUploadServlet';
    var uri = 'http://52.66.12.242:8040/wedding_rings/image_service/upload';
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.mimeType = "image/jpeg";
    options.chunkedMode = true;
    var headers = {
      'Content-Type':'multipart/form-data',
    };
    options.headers = headers;
    $cordovaFileTransfer.upload(uri,fileURL, options).then(function(result) {
      console.log(result);
      if(result.responseCode==200){
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: $filter('translate')('SUCCESSFUL')+'!',
          template: $filter('translate')('IMAGE_UPLOAD_SUCCESSFUL')
        });
      }
    }, function(err) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: $filter('translate')('ERROR')+'!',
        template: $filter('translate')('IMAGE_UPLOAD_UNSUCCESSFUL')
      });
    }, function (progress) {
      $scope.uploadProgress = progress.loaded/progress.total*100;
      // console.log("Progress: " + $scope.uploadProgress);
    });
  }

  function selectPicture(sourceType) {
    var options = setOptions(sourceType);
    navigator.camera.getPicture(function cameraSuccess(imagePath) {
      var currentName = imagePath.replace(/^.*[\\\/]/, '');
      var d = new Date(),
        n = d.getTime(),
        newFileName =  n + ".jpg";
      if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
        window.FilePath.resolveNativePath(imagePath, function(entry) {
            window.resolveLocalFileSystemURL(entry, success, fail);
            function success(fileEntry) {
              var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
              $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success){
                uploadImage(newFileName);
              }, function(error){
                $scope.showAlert('Error', error.exception);
              });
            };
            function fail(e) {
              console.error('Error: ', e);
            }
          }
        );
      } else {
        var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function(success){
          uploadImage(newFileName);
        }, function(error){
          $scope.showAlert('Error', error.exception);
        });
      }
    }, function cameraError(error) {
      console.debug("Unable to obtain picture: " + error, "app");
    }, options);
  }

  function uploadImage(newFileName) {
    var url = 'http://52.66.12.242:8040/wedding_rings/image_service/upload';

    var targetPath = $scope.pathForImage(newFileName);

    var filename = newFileName;

    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpeg",
      params : {}
    };

    $ionicLoading.show({
      template: '<ion-spinner icon="circles"></ion-spinner><br><span>Uploading</span>',
      hideOnStateChange: false
    });

    $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
      console.log(result);
      $ionicLoading.hide();
    });
  }

  $scope.pathForImage = function(image) {
    if (image === null) {
      return '';
    } else {
      if(cordova){
        return cordova.file.dataDirectory + image;
      }
    }
  };

  function pushImage(imgName) {
    $scope.item.images.push(imgName);
  }

  function setOptions(srcType){
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: srcType,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
  }



}

