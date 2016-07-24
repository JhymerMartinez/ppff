(function(){
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('SiteController', SiteController);

  function SiteController($rootScope, $ionicLoading, $auth, $state) {

    $rootScope.$on('$stateChangeStart', function(){
      $ionicLoading.show({
        template: 'cargando...'
      });
    });

    $rootScope.$on('$stateChangeSuccess', function(){

      if (!$state.includes('app')) {
        $auth.validateUser()
          .then(function(){
            debugger;
            $ionicLoading.hide();
            $state.go('app.playlists');
          })
          .catch(function () {
            debugger;
            $ionicLoading.hide();
          });
      } else {
        $ionicLoading.hide();
      }
    });

    $rootScope.$on('$stateChangeError', function(){
      debugger;
      $ionicLoading.hide();
    });

  }
})();
