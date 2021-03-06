'use strict';

angular.module('auth.module').controller('AuthSignUpCtrl', AuthSignUpCtrl);

AuthSignUpCtrl.$inject = ['$scope','$rootScope','$state','$stateParams','appConfig','$log','httpService','serverConfig'];

function AuthSignUpCtrl($scope,$rootScope,$state,$stateParams,appConfig,$log,httpService,serverConfig) {

  $scope.appConfig = appConfig;

  $scope.serviceProvider = {};

  init();

  function init(){
    $scope.categories = [];
    var extended_url = '/service_category_service/getServiceCategories';
    httpService.getRequest(serverConfig.clientAPI,extended_url,{}).then(function(response){
      if(response.status === 200){
        $scope.categories = response.data;
      }
    });
  }


  $scope.goBack = function () {
    $state.go('authSignIn');
  };
  $scope.openSignIn = function () {
    $state.go('authSignIn');
  }
  $scope.goToStep2 = function () {
    $state.go('authSignUpStep2',{"initialData" : $scope.serviceProvider });
  };

  //auto complete

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
    $scope.serviceProvider.city = item.name;
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

}
