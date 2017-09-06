'use strict';

angular.module('serviceProvider.module').controller('ServiceProviderLocationCtrl',ServiceProviderLocationCtrl );

ServiceProviderLocationCtrl.$inject = ['$scope','$state','$rootScope','$cordovaGeolocation'];

function ServiceProviderLocationCtrl($scope,$state,$rootScope,$cordovaGeolocation) {


  function initMap() {
    var mapOptions = {
      center: new google.maps.LatLng(6.9271,79.8612),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
  }

  $scope.getCurrentLocation = function () {
    var options = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      $scope.map.panTo(latLng);
      var marker = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });

    }, function(error){
      console.log("Could not get location");
    });

  };

  init();

  function init(){
    initMap();
  }

}

