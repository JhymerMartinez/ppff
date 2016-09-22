(function () {
  'use strict';
  angular
    .module('porttare.services')
    .factory('CommonService', CommonService);

  function CommonService($http, ENV, $q) {

    var service = {
      createNewElement: createNewElement
    };

    return service;

    function createNewElement(data, api) {
      var defer = $q.defer();
      $http({
        method: 'POST',
        url: ENV.apiHost + api,
        data: data
      }).then(function success(res){
        defer.resolve(res.data);
      },function error(res){
        defer.reject(res);
      });
      return defer.promise;
    }

  }
})();
