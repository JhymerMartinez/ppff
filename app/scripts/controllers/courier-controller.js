(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('CourierController', CourierController);

  function CourierController(CourierService,
                            $ionicPopup,
                            $state,
                            $ionicLoading,
                            APP) {
    var courierVm = this;
    var successState = APP.successState;
    courierVm.createCourier = createCourier;
    courierVm.courierForm = {};
    courierVm.messages = {};
    courierVm.locations = [
      'Loja',
      'Quito'
    ];
    courierVm.licenses = [
      'A',
      'A1',
      'B',
      'C1',
      'C',
      'D1',
      'D',
      'E1',
      'E',
      'F',
      'G'
    ];
    courierVm.mobilization = [
      'Motocicleta particular',
      'Motocicleta comercial',
      'Automóvil particular',
      'Automóvil estatal',
      'Automóvil comercial',
      'Bus escolar / turismo',
      'Bus pasajeros',
      'Pesado',
      'Especiales'
    ];

    function createCourier() {
      $ionicLoading.show({
        template: '{{::("globals.sending"|translate)}}'
      });
      CourierService.createNewCourier(courierVm.courierForm)
        .then(function success() {
          $ionicLoading.hide();
          $state.go(successState).then(function () {
            $ionicPopup.alert({
              title: 'Alerta',
              template: '{{::("courier.successCourierSave"|translate)}}'
            });
          });
        },
        function error(resp) {
          if (resp.data && resp.data.errors) {
            courierVm.messages = resp.data.errors;
          } else {
            $ionicPopup.alert({
              title: 'Error',
              template: resp.data && resp.data.error ? resp.data.error :
                '{{::("globals.pleaseTryAgain"|translate)}}'
            });
          }
          $ionicLoading.hide();
        });
    }
  }
})();
