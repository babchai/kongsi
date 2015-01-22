'use strict';


angular.module('igorApp')
  
  .controller('AddCtrl', function ($scope, $rootScope, $log,$http,$location,$upload) {
	$scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
     $scope.loader = { 

              loading : false ,

             };
    $rootScope.isLoginPage        = true;
    $rootScope.isLightLoginPage   = true;
    $rootScope.isLockscreenPage   = false;
    $rootScope.isMainPage         = false;


  $scope.loadingProgress = 0;
     $scope.tags = [
        {id:'book', name:'book'},
        {id:'music', name:'music'},
        {id:'outdoor-gear',name:'outdoor gear'}
     ];

     $scope.autocompleteOptions = {
                        componentRestrictions: { country: 'my' },
                        types: ['(cities)']
                    };
       $scope.showPosition = function (position) {
            $scope.coords = position.coords;
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
               $scope.getStreet(position);

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

     $scope.getStreet = function(position){
         $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+position.coords.longitude+'&key=AIzaSyCZR40kKLZTJfQGn-bq9n0WNyyx9trm8ZI').
         success(function(data){
            console.log('success');
            console.log(data.results[0].formatted_address);
            $scope.itemLocation = data.results[0].formatted_address;
         }).
         error(function(data){
          console.log('error');
          console.log(data);

         });

     };
    /* $scope.getLocation = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position){
                  console.log(position);
                });
            }
            else {
                $scope.error = 'Geolocation is not supported by this browser.';
            }
        };*/
         
     $scope.init = function()
     {
        $scope.getLocation();
     };
    
     $scope.dateAvail = {startDate: null, endDate: null};
    
      $scope.uploadPic = function($files) {
         
          //$files: an array of files selected, each file has name, size, and type.
            var file = $files[0];
             console.log(file);
            $scope.upload = $upload.upload({
              url: 'http://localhost:3000/freebies/upload', //upload.php script, node.js route, or servlet url
              method: 'POST',
              // headers: {'header-key': 'header-value'},
              // withCredentials: true,
              data: $scope.picFile,
              file: file, // or list of files: $files for html5 only
              /* set the file formData name ('Content-Desposition'). Default is 'file' */
              //fileFormDataName: myFile, //or a list of names for multiple files (html5).
              /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
              //formDataAppender: function(formData, key, val){}
            }).progress(function(evt) {
              console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
              $scope.loadingProgress =  parseInt(100.0 * evt.loaded / evt.total);
              $scope.loader.loading = true;  // false

            }).success(function(data, status, headers, config) {
              // file is uploaded successfully
              // $scope.loader.loading = false;  
              console.log(data);
            });
            //.error(...)
            //.then(success, error, progress); 
            //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
                    /* alternative way of uploading, send the file binary with the file's content-type.
             Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
             It could also be used to monitor the progress of a normal http post/put request with large data*/
          // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
      };
     

    $scope.submit = function(){
     
      
      $scope.tags.id = this.tag.id;
      $scope.availability = this.dateAvail;
     // $scope.image = this.photo;
      $scope.uploadPic($scope.picFile);

      
      $http.post('http://localhost:3000/freebies', 
                   {
                       tags:$scope.tags.id,
                       title:$scope.title,
                       location:[$scope.coords.latitude, $scope.coords.longitude],
                       description:$scope.description,
                       lifespan:$scope.availability ,
                       image: $scope.image
                   }).
                    success(function(data, status, headers, config) {
                      // this callback will be called asynchronously
                      // when the response is available
                      //$location.path('/add');
                      console.log('success');

                    }).
                    error(function(data, status, headers, config) {
                      console.log('failed');
                      $location.url('/404');

                      // called asynchronously if an error occurs
                      // or server returns response with an error status.
                    });
   
    };

  });