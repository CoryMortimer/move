'use strict';

// Declare app level module which depends on views, and components
angular.module('move', [
  'ngRoute',
  'move.view1',
  'move.view2',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
