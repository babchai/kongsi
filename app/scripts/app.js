'use strict';

/**
 * @ngdoc overview
 * @name igorApp
 * @description
 * # igorApp
 *
 * Main module of the application.
 */
angular
  .module('igorApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'uiGmapgoogle-maps',
    'facebook',
    'google.places',
    'ui.bootstrap',
    'daterangepicker',
    'angularFileUpload'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/main');
    $stateProvider
      .state('about', {
        url :'/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('main', {
        url :'/main',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('login', {
        url :'/login',
        templateUrl: 'views/login.html',
        controller:'LoginCtrl'
      })
      .state('add', {
        url :'/add',
        templateUrl: 'views/add.html',
        controller:'AddCtrl'
      })
      .state('menu', {
        url :'/menu',
        templateUrl: 'views/menu.html',
        controller:'MenuCtrl'
      });

      
  })
  .config(
    function(FacebookProvider) {
       // var myAppId = '1551276628446974';
        FacebookProvider.init('1551276628446974');
     }
    );
