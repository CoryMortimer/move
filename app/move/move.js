'use strict';

angular.module('move.move', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/move', {
    templateUrl: 'move/move.html',
    controller: 'MoveCtrl'
  });
}])

.controller('MoveCtrl', ['$scope', '$timeout', function($scope, $timeout) {
  var notificationNum = 0;
  $scope.tickInterval = 1000;
  
  $scope.time = {
    current: new Date(),
    lastMove: null,
    nextMove: null,
    minutesTill: null,
    timeToMove: false,
    timeToSit: null,
    timeRemaining: null,
    moveBtn: false,
    sitBtn: true,
  };
  
  var tick = function() {
    $scope.time.current = Date.now(); // get the current time
    if ($scope.time.nextMove) { // if a next move time
      $scope.time.minutesTill = $scope.time.nextMove - $scope.time.current; // tick clock down until zero
      if ($scope.time.minutesTill <= 0) { // when you hit zero
        $scope.notify('move');
        $scope.time.nextMove = null;
        $scope.time.minutesTill = null;
        $scope.time.moveBtn = true;
        $scope.time.sitBtn = false;
      }
    }
    if ($scope.time.timeToMove) {
      $scope.time.timeRemaining = $scope.time.timeToSit - $scope.time.current;
      if ($scope.time.timeRemaining <= 0) {
        $scope.notify('sit');
        $scope.time.timeToMove = false;
        $scope.time.sitBtn = true;
      }
    }
    $timeout(tick, $scope.tickInterval); // reset the timer
    };
  
  $scope.setNextMoveTime = function () {
    if (!$scope.time.lastMove) {
      $scope.time.lastMove = Date.now();
    }
    $scope.time.nextMove = new Date($scope.time.lastMove);
    $scope.time.nextMove.setMinutes($scope.time.nextMove.getMinutes() + 1);
    $scope.time.minutesTill = $scope.time.nextMove - $scope.time.current;
    $scope.time.timeToMove = false;
  };
  
  $scope.startMoving = function() {
    $scope.time.moveBtn = false;
    $scope.time.timeToMove = true;
    var now = Date.now();
    $scope.time.lastMove = new Date(now);
    $scope.time.timeToSit = new Date(now);
    $scope.time.timeToSit.setMinutes($scope.time.timeToSit.getMinutes() + 1);
  };
  
  $scope.notify = function(kind) {
    if (window.chrome && chrome.app && chrome.app.runtime) {
      if (notificationNum > 100) {
        notificationNum = 0;
      }
      notificationNum = notificationNum + 1;
    
      if (kind === 'move') {
        chrome.notifications.create(
          'timeToMove' + notificationNum,{   
          type: 'basic', 
          iconUrl: 'move.png', 
          title: 'Time to move!', 
          message: 'It is time to move! Get up and do something!',
          buttons: [{ title: 'Start move timer'},
                    { title: 'Dismiss'}],
          priority: 0}
        );
      } else if (kind === 'sit') {
        chrome.notifications.create(
          'timeToSit' + notificationNum,{   
          type: 'basic', 
          iconUrl: 'move.png', 
          title: 'You may sit', 
          message: 'Nice job! You can sit down. Don\'t forget to reset your timer!',
          buttons: [{ title: 'Start sitting timer'},
                    { title: 'Dismiss'}],
          priority: 0}
        );
      }
    } else {
      if (kind === 'move') {
        alert("It is time to move! Get up and do something!");
      } else if (kind === 'sit') {
        alert("Nice job! You can sit down. Don\'t forget to reset your timer!");
      }
    }
  };

  // Start the timer
  $timeout(tick, $scope.tickInterval);
  
  if (window.chrome && chrome.app && chrome.app.runtime) {
    chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex) {
      if (notificationId.indexOf('timeToMove') >= 0) {
        if (buttonIndex === 0) {
          if ($scope.time.moveBtn) {
            $scope.startMoving();
            chrome.app.window.get('move').focus();
          }
        }
        chrome.notifications.clear(notificationId);
      } else if (notificationId.indexOf('timeToSit') >= 0) {
        if (buttonIndex === 0) {
          if ($scope.time.sitBtn) {
            $scope.setNextMoveTime();
            chrome.app.window.get('move').focus();
          }
        }
        chrome.notifications.clear(notificationId);
      }  
    });
  }
  
}]);