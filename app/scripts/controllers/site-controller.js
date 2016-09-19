(function(){
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('SiteController', SiteController);

  function SiteController($rootScope, $ionicLoading, $auth, $state, $location, APP) {

    var successState = APP.successState;
    var specialStates = [
      'error',
      'reset'
    ];

    $rootScope.$on('$stateChangeStart', function(){
      debugger;
      $ionicLoading.show({
        template: 'cargando...'
      });
    });

    $rootScope.$on('$stateChangeSuccess', function(){
      // Check if user is authenticated
      if (isSimpleState($state)) {
        $auth.validateUser()
          .then(function(){
            if (isSpecialState(specialStates, $state.current.name)) {
              var userValid = true;
              verifyParamsAndRedirect($state.current.name, userValid);
            } else {
              $state.go(successState).then(function() {
                $ionicLoading.hide();
              });
            }
          })
          .catch(function () {
            if (isSpecialState(specialStates, $state.current.name)) {
              var userValid = false;
              verifyParamsAndRedirect($state.current.name, userValid);
            } else {
              $ionicLoading.hide();
            }
          });
      } else {
        $ionicLoading.hide();
      }
    });

    $rootScope.$on('$stateChangeError', function(){
      $ionicLoading.hide();
    });

    function isSimpleState(state) {
      var valid = !state.includes('app');
      return valid;
    }

    function isSpecialState(states, name) {
      return states.indexOf(name) > -1;
    }

    function redirecTo(state, paramsOK) {
      if (paramsOK) {
        $state.go(state).then(function() {
          $ionicLoading.hide();
        });
      } else {
        $state.go(successState).then(function() {
          $ionicLoading.hide();
        });
      }
    }

    function veriFyResetParams(url) {
      //var re = /error=([^&]+)#/;
      //var valid = re.exec(url) !== null;
      return true;
    }

    function verifyParamsAndRedirect(stateName, userValid) {
      debugger;
      var url = $location.absUrl();
      switch (stateName) {
        case specialStates[0]: // error
          debugger;
          var re = /error=([^&]+)#/;
          var valid = re.exec(url) !== null;
          redirecTo(specialStates[0], valid);
          break;
        case specialStates[1]: // reset
          debugger;
          //var status = !userValid ? veriFyResetParams(url) : false;
          //redirecTo(specialStates[1], status);
          if(!userValid) {
            redirecTo(specialStates[1], false);
          }else{
            var isValid = veriFyResetParams(url);
            redirecTo(specialStates[1], isValid);
          }
          break;
      }
    }
  }
})();
