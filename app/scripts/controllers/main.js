'use strict';

/**
 * @ngdoc function
 * @name experiment2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the experiment2App
 */


angular.module('igorApp')
  .controller('MainCtrl', function ($scope, $log) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];         
    
    $scope.showPosition = function (position) {
            $scope.lat = position.coords.latitude;
            $scope.lng = position.coords.longitude;
            $scope.accuracy = position.coords.accuracy;
            $scope.$apply();
 
            var latlng = new google.maps.LatLng($scope.lat, $scope.lng);
            $log.log(latlng);
            //$scope.model.myMap.setCenter(latlng);
            $scope.map = { center: { latitude: $scope.lat, longitude: $scope.lng}, zoom: 15};

		      var markers = [];
		   
 				var ret = {
                 latitude: position.coords.latitude,
                 longitude: position.coords.longitude,
                 title: 'm'
                };
                ret.id = 1;

		       markers.push(ret);
               $log.log(markers);

               $scope.markers = markers;
        };

    $scope.getLocation = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
            }
            else {
                $scope.error = 'Geolocation is not supported by this browser.';
            }
        };

    $scope.getLocation();

  });

