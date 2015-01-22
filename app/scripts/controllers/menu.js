'use strict';

/**
 * @ngdoc function
 * @name experiment2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the experiment2App
 */


angular.module('igorApp')
  .controller('MenuCtrl', function ($scope, $log, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];         
    
   $http.get('http://localhost:3000/freebies').
	  success(function(data) {
	     $scope.menus = data;

	  }).
	  error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });
    });