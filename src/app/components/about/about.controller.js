/**
 * Created by apatty-laptop on 6/15/2017.
 */
(function () {
  'use strict';
  angular
    .module('angularTest')
    .controller('AboutController',AboutController);

  function AboutController() {
    var vm = this;

    function init() {
      console.log("About page started");
    }

    init();
  }
})();
