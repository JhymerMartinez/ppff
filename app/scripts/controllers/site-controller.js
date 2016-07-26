(function(){
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('SiteController', SiteController);

  function SiteController($rootScope, $ionicLoading, $auth, $state, $location, $window) {

    $rootScope.$on('$stateChangeStart', function(){
      $ionicLoading.show({
        template: 'cargando...'
      });
    });

    $rootScope.$on('$stateChangeSuccess', function(){
      // Check if user is authenticated
      if (!$state.includes('app')) {
        var test = $location;
        var test2 = $window;
        $auth.validateUser()
          .then(function(){
            $ionicLoading.hide();
            $state.go('app.playlists');
            var reditectTo = window.location.origin + window.location.pathname + $state.href('app.playlists')
            $window.location.href = reditectTo;
        })
          .catch(function () {
            $ionicLoading.hide();
          });
      } else {
        $ionicLoading.hide();
      }
    });

    $rootScope.$on('$stateChangeError', function(){
      $ionicLoading.hide();
    });

  }
})();
