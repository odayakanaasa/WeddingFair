'use strict';

angular.module('shop.module').controller('ItemListCtrl',ItemListCtrl );

ItemListCtrl.$inject = ['$scope','$state','$rootScope','$filter','$mdSidenav','$log'];

function ItemListCtrl($scope,$state,$rootScope,$filter,$mdSidenav,$log) {

  $scope.isSearchEnabled = false;
  $scope.bookMarked = false;

  $scope.datapointsList = [
    { DPNAME: 'Samsung', id: 1 },
    { DPNAME: 'Android', id: 2 },
    { DPNAME: 'Apple', id: 3 },
    { DPNAME: 'Indigo', id: 4 },
    { DPNAME: 'Phonegap', id: 8 },
    { DPNAME: 'System', id: 9 },
    { DPNAME: 'India', id: 5 },
    { DPNAME: 'Ionic', id: 6 }
  ];
  $scope.names=$scope.datapointsList ;
  $scope.adn = {};
  $scope.srchchange = function () {

    $scope.names = null;
    var filtervalue = [];
    var serachData=$scope.datapointsList;
    console.log(serachData);
    for (var i = 0; i <serachData.length; i++) {

      var fltvar = $filter('uppercase')($scope.adn.item);
      var jsval = $filter('uppercase')(serachData[i].DPNAME);

      if (jsval.indexOf(fltvar) >= 0) {
        filtervalue.push(serachData[i]);
      }
    }
    // console.log("last");
    console.log(filtervalue);
    $scope.names = filtervalue;

  };

  $scope.ressetserach = function () {
    $scope.adn.item = "";
    $scope.names =$scope.datapointsList;
    $scope.isSearchEnabled = false;
  }

  //auto complete

  // var self = this;

  $scope.simulateQuery = false;
  $scope.isDisabled    = false;

  // list of `state` value/display objects
  $scope.states        = loadAll();
  $scope.querySearch   = querySearch;
  $scope.selectedItemChange = selectedItemChange;
  $scope.searchTextChange   = searchTextChange;

  $scope.newState = newState;

  function newState(state) {
    alert("Sorry! You'll need to create a Constitution for " + state + " first!");
  }

  // ******************************
  // Internal methods
  // ******************************

  /**
   * Search for states... use $timeout to simulate
   * remote dataservice call.
   */
  function querySearch (query) {
    var results = query ? $scope.states.filter( createFilterFor(query) ) : $scope.states,
      deferred;
    if ($scope.simulateQuery) {
      deferred = $q.defer();
      $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
      return deferred.promise;
    } else {
      return results;
    }
  }

  function searchTextChange(text) {
    $log.info('Text changed to ' + text);
  }

  function selectedItemChange(item) {
    $log.info('Item changed to ' + JSON.stringify(item));
  }

  /**
   * Build `states` list of key/value pairs
   */
  function loadAll() {
    var allStates = 'Ampara, Anuradhapura, Badulla, Batticalao, Colombo, Galle, Gampaha, Hambantota, Jaffna, Kalutara, Kandy, Kegalle, Kilinochchi, Kurunegala, Mannar, Matale, Matara, Moneragala, Mullaittivu, Nuwara Eliya, Polonnaruwa, Puttalam, Ratnapura, Trincomalee, Vavuniya';

    return allStates.split(/, +/g).map( function (state) {
      return {
        value: state.toLowerCase(),
        display: state
      };
    });
  }

  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);

    return function filterFn(state) {
      return (state.value.indexOf(lowercaseQuery) === 0);
    };

  }

  $scope.goHome = function(){
    $state.go('home');
  };

  $scope.openServiceProvider = function () {
    $state.go('service-provider');
  };

}
