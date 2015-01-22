'use strict';


angular.module('igorApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $log, $location,$http, Facebook) {
	$scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    console.log("hello");
    $rootScope.varhello = "hello";
    $rootScope.isLoginPage        = true;
    $rootScope.isLightLoginPage   = true;
    $rootScope.isLockscreenPage   = false;
    $rootScope.isMainPage         = false;

   // Define user empty data :/
      $scope.user = {};
      
      // Defining user logged status
      $scope.logged = false;
      
      // And some fancy flags to display messages upon user status change
      $scope.byebye = false;
      $scope.salutation = false;
      
      /**
       * Watch for Facebook to be ready.
       * There's also the event that could be used
       */
      $scope.$watch(
        function() {
             return Facebook.isReady();
        },
        function(newVal) {
          if (newVal){
            $scope.facebookReady = true;
           }
        }
      );
      
      var userIsConnected = false;
      
      Facebook.getLoginStatus(function(response) {
        console.log(response);
        if (response.status === 'connected') {
          console.log('connected');
          userIsConnected = true;
          console.log('get me');
          $scope.$apply(function() {
            $scope.salutation = true;
            $scope.byebye     = false;    
          });
        }
        else
        {
          $scope.login();
        }
      });
      
      /**
       * IntentLogin
       */
      $scope.IntentLogin = function() {
        if(!userIsConnected) {
          $scope.login();
        }
      };
      
      /**
       * Login function
       */
       $scope.login = function() {
         Facebook.login(function(response) {
          if (response.status === 'connected') {
            $scope.logged = true;
            $scope.me();
          }
        
        });
       };

       /**
        * me 
        */
        $scope.me = function() {
          Facebook.api('/me', function(response) {
            /**
             * Using $scope.$apply since this happens outside angular framework.
             */
            $scope.$apply(function() {
                console.log(response);
                $http.post('http://localhost:3000/contributor', {uid:response.id,username:response.name}).
                    success(function(data, status, headers, config) {
                      console.log('success');
                      // this callback will be called asynchronously
                      // when the response is available
                      $location.path('/add');

                    }).
                    error(function(data, status, headers, config) {
                      console.log('failed');
                      $location.url('/404');

                      // called asynchronously if an error occurs
                      // or server returns response with an error status.
                    });
            	$scope.user = response;
              //$location.path('/add');

            });
            
          });
        };
      
      /**
       * Logout
       */
      $scope.logout = function() {
        Facebook.logout(function() {
          $scope.$apply(function() {
            $scope.user   = {};
            $scope.logged = false;  
          });
        });
      };
      
      /**
       * Taking approach of Events :D
       */
       
      $scope.$on('Facebook:statusChange', function(ev, data) {
        console.log('Status: ', data);
        if (data.status === 'connected') {
          $scope.$apply(function() {
          	$scope.me();
            $scope.salutation = true;
            $scope.byebye     = false;    
          });
        } else {
          $scope.$apply(function() {

            $scope.salutation = false;
            $scope.byebye     = true;
           // $scope.login();
            
            // Dismiss byebye message after two seconds
          /*$timeout(function() {
              $scope.byebye = false;
            }, 2000)*/
          }
          );
        }
      });  



///
  });