(function (angular) {
  'use strict';

  angular.module('config.module')
    .constant('serverConfig', {

      clientAPI: {
        serviceName: 'Client API Services',
        serviceUrl: 'http://52.66.12.242',
        port:'8040',
        base_url: '/wedding_rings'
      }

    });

})(angular);
