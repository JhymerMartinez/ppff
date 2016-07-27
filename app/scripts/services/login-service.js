(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('LoginService', LoginService);

  function LoginService($auth, $state, $ionicPopup) {

    var service = {
      loginWithFB: loginWithFB
    };

    return service;

    function loginWithFB() {
      var successState = 'app.playlists';
      $auth.authenticate('facebook')
        .then(function () {
          debugger;
          $state.go(successState);
        })
        .catch(function () {
          debugger;
          $ionicPopup.alert({
            title: 'Error',
            template: 'Hubo un error, intentalo nuevamente.'
          });
        });
    }
  }
})();
