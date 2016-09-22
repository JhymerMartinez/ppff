(function () {
  'use strict';
  angular
    .module('porttare.services')
    .factory('ProviderService', ProviderService);

  function ProviderService(CommonService) {

    var service = {
      createNewProvider: createNewProvider
    };

    return service;

    function createNewProvider(data) {
      return CommonService.createNewElement(data, '/api/provider/profile');
    }

  }
})();
