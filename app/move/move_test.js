'use strict';

describe('move.move module', function() {
  
  beforeEach(module('move.move'));
  var $scope;
  var moveCtrl;
  beforeEach(inject(function($controller, $rootScope) {
    $scope = $rootScope.$new();
    moveCtrl = $controller('MoveCtrl', {$scope: $scope});
  }));

  describe('move controller', function() {

    it('should expect the controller to be defined.', function() {
      expect(moveCtrl).toBeDefined();
    });

  });
  
});