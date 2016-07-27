(function(){
'use strict';

  angular
    .module('porttare.controllers')
    .controller('RegisterController', RegisterController);

  function RegisterController($ionicLoading,
                              $auth,
                              $ionicPopup,
                              $state,
                              $scope,
                              LoginService,
                              $rootScope) {
    var registerVm = this;
    registerVm.register = register;
    registerVm.registerForm = {};
    registerVm.loginWithFB = LoginService.loginWithFB;

    $rootScope.$on('auth:login-success', function(ev, user) {
       debugger;
    });

    function register() {
      $ionicLoading.show({
        template: 'cargando...'
      });
      $auth.submitRegistration(registerVm.registerForm)
        .then(function() {
          $state.go('login').then(function(){
            $ionicPopup.alert({
              title: 'Alerta',
              template: 'Usuario creado satisfactoriamente'
            });
          });
        })
        .finally(function(){
          $ionicLoading.hide();
        });
    }

    $scope.$on('auth:registration-email-error', function(event, response){
      var errors;
      if (response.errors.full_messages) { // jshint ignore:line
        errors = response.errors.full_messages.join(', '); // jshint ignore:line
      }else{
        errors = response.errors.join(', ');
      }
      $ionicPopup.alert({
        title: 'Error',
        template: errors
      });
    });

  }
})();
