(function(){
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('SiteController', SiteController);

  function SiteController($rootScope, $ionicLoading, $auth, $state, APP) {

    var successState = APP.successState;

    $rootScope.$on('$stateChangeStart', function(){
      $ionicLoading.show({
        template: 'cargando...'
      });
    });

    $rootScope.$on('$stateChangeSuccess', function(){
      // Check if user is authenticated
      if (!$state.includes('app') && !$state.is('reset')) {
        debugger;
        $auth.validateUser()
          .then(function(){
            $ionicLoading.hide();
            $state.go(successState);
          })
          .catch(function () {
            $ionicLoading.hide();
          });
      } else {
        debugger;
        if ($state.is('reset')) {
          debugger;
          $state.go(successState);
        }
        $ionicLoading.hide();
      }
    });

    $rootScope.$on('$stateChangeError', function(){
      $ionicLoading.hide();
    });

  }
})();
