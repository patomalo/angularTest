/**
 * Created by apatty-laptop on 6/15/2017.
 */
(function () {
  'use strict';
  angular
    .module('angularTest')
    .controller('UploadVideoController',UploadVideoController);

  function UploadVideoController($http, $scope, toastr) {
    var vm = this;
    vm.progressBarActive = false;
    vm.videoList = [];

    var result;

    function init() {
      vm.progressBarActive = false;
      console.log("upload page started");
      getAllVideos();
    }

    function convertToMb(size) {
      if(size) {
        var mb = (size / 1024) / 1024;
        return mb;
      } else {
        return 0;
      }
    }

    function getAllVideos() {
      $http({
        url: 'https://api.wistia.com/v1/medias.json?api_password=6f2bf05ae1fcde069f539257ff7696ea3a6cd94be21dba0e5ec8d8386516d2cc',
        method: 'GET'
      }).success(function (response) {
        //console.log("Patomalo", response);
        vm.videoList = [];
        if(response.length > 0) {
          for(var i = 0; i < response.length; i++) {
            var row = response[i];
            var newSize = convertToMb(row.assets[0].fileSize).toFixed(2);
            vm.videoList.push({
              id: row.id,
              image: row.thumbnail.url,
              url: row.assets[0].url,
              title: row.name,
              size: newSize + ' MB',
              hashedId: row.hashed_id
            });
          }
        }
      }).error(function (response) {
        toastr.error("Error: " + response);
      });
    }

    $(function() {
      $('#submit').fileupload({
        url:'https://upload.wistia.com/?api_password=6f2bf05ae1fcde069f539257ff7696ea3a6cd94be21dba0e5ec8d8386516d2cc',
        dataType: 'json',
        sequentialUploads: true,
        progressall: function (e, data) {
          if(!vm.progressBarActive) {
            vm.progressBarActive = true;
            $scope.$apply();
          }
          var progress = parseInt(data.loaded / data.total * 100, 10);
          $('#progress .progress-bar').css(
            'width',
            progress + '%'
          );
        },
        done: function (e, data) {
          if(vm.progressBarActive) {
            vm.progressBarActive = false;
            $scope.$apply();
            $('#progress .progress-bar').css('width', '0%');
          }

          if(data.response()){
            result = data.response().result;
          }

          getAllVideos();
          /*vm.videoList.push({
            id: result.id,
            image: result.thumbnail.url,
            title: result.name,
            size: convertToMb(data.total).toFixed(2) + ' MB'
          });*/

          toastr.success(data.response().textStatus);

        },
        error: function (jqXHR, textStatus, errorThrown) {
          if(jqXHR.responseJSON) {
            toastr.error(jqXHR.responseJSON.error);
          }
          if(vm.progressBarActive) {
            vm.progressBarActive = false;
            $scope.$apply();
            $('#progress .progress-bar').css('width', '0%');
          }
        }
      });
    });

    vm.deleteVideo = function (videoId) {
      //console.log("patomalo", videoId);
      var requestUrl = 'https://api.wistia.com/v1/medias/' + videoId + '.json?api_password=6f2bf05ae1fcde069f539257ff7696ea3a6cd94be21dba0e5ec8d8386516d2cc';
      $http({
        url: requestUrl,
        method: 'DELETE'
      }).success(function (response) {
        //console.log("Patomalo", response);
        toastr.success("Video Deleted");
        getAllVideos();
      }).error(function (response) {
        toastr.error("Error: " + response);
      });
    };

    init();
  }
})();
