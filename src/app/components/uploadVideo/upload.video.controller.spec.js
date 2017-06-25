/**
 * Created by apatty-laptop on 6/25/2017.
 */
(function() {
  'use strict';

  describe('upload Video', function(){
    var vm;
    var $httpBackend;
    var toastr;

    beforeEach(module('angularTest'));
    beforeEach(inject(function(_$controller_, _$httpBackend_, _toastr_) {

      vm = _$controller_('UploadVideoController');
      $httpBackend = _$httpBackend_;
      toastr = _toastr_;
    }));
    
    it('should have any boolean', function() {
      expect(vm.classAnimation).toEqual(jasmine.any(Boolean));
    });

    it('should be a good request', function() {
      $httpBackend.when('GET',  'https://api.wistia.com/v1/medias.json?api_password=6f2bf05ae1fcde069f539257ff7696ea3a6cd94be21dba0e5ec8d8386516d2cc').respond(200);
    });

    it('should log a error', function() {
      $httpBackend.when('GET', 'https://api.wistia.com/v1/medias.json').respond(500);

    });
  });
})();

