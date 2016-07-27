'use strict';

angular
  .module('porttare.controllers')
  .controller('PreController', PreController);

function PreController($auth, $state, $ionicPopup, $window, LoginService, $rootScope) {
  var preVm = this;
  preVm.loginWithFB = LoginService.loginWithFB;
  var successState = 'app.playlists';

/*    $rootScope.$on('auth:login-success', function(ev, user) {
       debugger;
    });*/

  function load(){
    if ($window.localStorage && !$window.localStorage.getItem('hasViewedTutorial')) {
      $state.go('intro');
    }
    $auth.validateUser().then(function(){
      $state.go(successState);
    });
  }

  load();

}
