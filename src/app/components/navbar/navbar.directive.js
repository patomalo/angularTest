(function() {
  'use strict';

  angular
    .module('angularTest')
    .directive('navbarHeader', navbarHeader);

  /** @ngInject */
  function navbarHeader() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment, $state) {
      var vm = this;
      vm.tabActive = true;
      // "vm.creationDate" is available by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();

      vm.goToUpload = function () {
        vm.tabActive = false;
        $state.go('about');
      };

      vm.homeActive = function () {
        vm.tabActive = true;
      };
    }
  }

})();
