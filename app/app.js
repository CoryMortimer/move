'use strict';

// Declare app level module which depends on views, and components
angular.module('move', [
  'ngRoute',
  'move.move'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/move'});
}]);
