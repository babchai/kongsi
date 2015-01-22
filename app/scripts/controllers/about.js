'use strict';

/**
 * @ngdoc function
 * @name igorApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the igorApp
 */
angular.module('igorApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
