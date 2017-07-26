'use strict';

/**
 * @ngdoc function
 * @name mwgApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the mwgApp
 */
angular.module('mwgApp')
  .controller('HeaderCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
    //All variables that are accessible via the HTML view get attached to vm (View Model)
    var vm = this;

    $scope.$location = $location;
    $scope.mobileMenuOpen = false;
    $scope.mobileAboutMenuOpen = false;
    $scope.topPath = null;
    $scope.aboutPeople = 0;

    $rootScope.prevActive = false;
    $rootScope.nextActive = true;

    $scope.toggleMenu = function() {
      $scope.mobileMenuOpen = !$scope.mobileMenuOpen;
    };

    $scope.closeMenu = function() {
      $scope.mobileMenuOpen = false;
      if ($scope.mobileAboutMenuOpen) {
        $scope.mobileAboutMenuOpen = false;
        $rootScope.$broadcast('header.close');
      }
    };

    $scope.prev = function() {
      if($rootScope.prevActive) {
        $rootScope.$broadcast('header.prev');
      }

      // console.log($scope.aboutPeople.currentIndex);
    };

    $scope.next = function() {
      if($rootScope.nextActive) {
        $rootScope.$broadcast('header.next');
      }
      // console.log($scope.aboutPeople);
    };

    $scope.navigate = function(scope, path) {
      if (scope.topPath === path) {
        $scope.closeMenu();
      }
    };

    $rootScope.setPrevNext = function(args) {
      $rootScope.prevActive = args.cI === 0 ? false : true;
      $rootScope.nextActive = args.cI + 1 >= args.maxI ? false : true;
    };

    $scope.$on('$routeChangeSuccess', function(event, args){
      $scope.mobileMenuOpen = false;
      $scope.mobileAboutMenuOpen = false;
      $scope.topPath = $location.path().split('/')[1];
      // console.log($location.path().split('/'));
    });

    $scope.$on('$routeChangeStart', function(event, args){
      $rootScope.overlayMenu = false;
      $rootScope.isWork = false;
    });

    $rootScope.$on('about.detail', function(event, args) {
      if ($rootScope.isMobile) {
        $scope.mobileAboutMenuOpen = true;
      } else {
        $scope.mobileAboutMenuOpen = false;
      }
      // $scope.mobileAboutMenuOpen = true;
      $scope.aboutPeople = args;
      // console.log('custom event handled', event, args);
      // console.log(args);
      // args.currentPerson = 'test-test';
      // args.closeAccordion();
    });

    $rootScope.$on('expertise.detail', function(event, args) {
      if ($rootScope.isMobile) {
        $scope.mobileAboutMenuOpen = !$scope.mobileAboutMenuOpen;
      }
    });

    $rootScope.$on('work.detail', function(event, args) {
      // if ($rootScope.isMobile) {
        $scope.mobileAboutMenuOpen = true;
        $rootScope.prevActive = args.prevItem;
        $rootScope.nextActive = args.nextItem;
      // }
    });

    $rootScope.$on('work.main', function(event, args) {
      // if ($rootScope.isMobile) {
        $scope.mobileAboutMenuOpen = false;
      // }
    });

  }]);
