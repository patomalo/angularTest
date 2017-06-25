(function() {
  'use strict';

  angular
    .module('angularTest')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/another',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('uploadVideo', {
        url: '/',
        templateUrl: 'app/components/uploadVideo/uploadVideo.html',
        controller: 'UploadVideoController',
        controllerAs: 'vm'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'app/components/about/about.html',
        controller: 'AboutController',
        controllerAs: 'vm'
    });

    $urlRouterProvider.otherwise('/');
  }

})();
