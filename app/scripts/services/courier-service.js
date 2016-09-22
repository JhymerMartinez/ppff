(function () {

  'use strict';

  angular
    .module('porttare.services')
    .factory('CourierService', CourierService);

  function CourierService($http, ENV) {

    var service = {
      createNewCourier: createNewCourier
    };

    return service;

    function createNewCourier(data) {
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/courier/profile',
        data: data
      });
    }

  }
})();
