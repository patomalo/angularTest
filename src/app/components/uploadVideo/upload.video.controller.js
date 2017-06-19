/**
 * Created by apatty-laptop on 6/15/2017.
 */
(function () {
  'use strict';
  angular
    .module('angularTest')
    .controller('UploadVideoController',UploadVideoController);

  function UploadVideoController() {
    var vm = this;

    function init() {
      console.log("patomalo Dota local");
    }

    init();
  }
})();
