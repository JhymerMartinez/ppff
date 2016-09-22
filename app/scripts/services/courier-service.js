(function () {
  'use strict';
  angular
    .module('porttare.services')
    .factory('CourierService', CourierService);

  function CourierService(CommonService) {

    var service = {
      createNewCourier: createNewCourier
    };

    return service;

    function createNewCourier(data) {
      return CommonService.createNewElement(data, '/api/courier/profile');
    }

  }
})();
