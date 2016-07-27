
(function(){
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('SiteController', SiteController);

  function SiteController($rootScope, $ionicLoading, $auth, $state, $location, $window) {

    $rootScope.$on('$stateChangeStart', function(){
      debugger;
      $ionicLoading.show({
        template: 'cargando...'
      });
    });

    $rootScope.$on('$stateChangeSuccess', function(){
      debugger;
      // Check if user is authenticated
      if (!$state.includes('app')) {
        var test = $location;
        var test2 = $window;
        $auth.validateUser()
          .then(function(){
            $ionicLoading.hide();
            //$state.go('app.playlists');
            window.location.href = reditectTo('app.playlists');
        })
          .catch(function () {
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

    function reditectTo(stateName) {
      debugger;
       return window.location.origin +
        window.location.pathname +
        $state.href(stateName);
    }

  }
})();
