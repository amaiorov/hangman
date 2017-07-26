'use strict';

/**
 * @ngdoc overview
 * @name mwgApp
 * @description
 * # mwgApp
 *
 * Main module of the application.
 */
angular
  .module('mwgApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'hj.scrollMagic',
    'headroom'
  ])
  .config(function($routeProvider, $locationProvider, $sceDelegateProvider) {
    $locationProvider.html5Mode(true);

    //Set whitelist for external assets
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      //Stage backend
      'http://ec2-52-14-24-43.us-east-2.compute.amazonaws.com/**',
      //YouTube
      'http://www.youtube.com/**',
      'https://www.youtube.com/**',
      //Vimeo
      'https://player.vimeo.com/**',
      'http://player.vimeo.com/**'
    ]);

    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm',
        title: 'McCann Worldgroup | Global Network of Advertising Agencies',
        description: 'McCann Worldgroup is a leading global marketing services company with an integrated network of advertising agencies in over 120 countries'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm',
        title: 'McCann Worldgroup | Global Network of Advertising Agencies',
        description: 'McCann Worldgroup is a leading global marketing services company with an integrated network of advertising agencies in over 120 countries'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'vm',
        title: 'About | McCann Worldgroup',
        description: 'Meet the McCann Worldgroup leadership team and learn about our unique approach to marketing and how we create cross-discipline, multi-platform, award-winning work for clients'
      })
      .when('/expertise', {
        templateUrl: 'views/expertise.html',
        controller: 'ExpertiseCtrl',
        controllerAs: 'vm',
        title: 'Our Marketing Expertise and Agencies | McCann Worldgroup',
        description: 'McCann Worldgroup is comprised of an integrated network of advertising and specialty marketing agencies, each with a unique expertise'
      })
      .when('/expertise/:slug', {
        templateUrl: 'views/expertise.html',
        controller: 'ExpertiseCtrl',
        controllerAs: 'vm'
      })
      .when('/news', {
        templateUrl: 'views/news.html',
        controller: 'NewsCtrl',
        controllerAs: 'vm',
        title: 'Marketing News and Awards | McCann Worldgroup',
        description: 'The latest in marketing news about the award winning work created by the McCann Worldgroup network of advertising agencies'
      })
      .when('/news/:slide', {
        templateUrl: 'views/news.html',
        controller: 'NewsCtrl',
        controllerAs: 'vm'
      })
      .when('/careers', {
        templateUrl: 'views/careers.html',
        controller: 'CareersCtrl',
        controllerAs: 'vm',
        title: 'Careers and Jobs | McCann Worldgroup',
        description: 'Discover jobs and career opportunities throughout the McCann Worldgroup network of agencies'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'vm',
        title: 'Contact | McCann Worldgroup',
        description: 'Get in contact within McCann Worldgroup'
      })
      .when('/privacy', {
        templateUrl: 'views/privacy.html',
        controller: 'PrivacyCtrl',
        controllerAs: 'vm',
        title: 'Privacy Policy | McCann Worldgroup',
      })
      .when('/terms', {
        templateUrl: 'views/terms.html',
        controller: 'TermsCtrl',
        controllerAs: 'vm',
        title: 'Terms of Use | McCann Worldgroup',
      })
      .when('/work', {
        templateUrl: 'views/work.html',
        controller: 'WorkCtrl',
        controllerAs: 'vm'
      })
      .when('/work/:slug', {
        templateUrl: 'views/work-detail.html',
        controller: 'WorkDetailCtrl',
        controllerAs: 'vm'
      })
      .when('/work-brand', {
        templateUrl: 'views/work-brand.html',
        controller: 'WorkBrandCtrl',
        controllerAs: 'vm'
      })
      .when('/about/approach', {
        templateUrl: 'views/about-approach.html',
        controller: 'AboutApproachCtrl',
        controllerAs: 'vm'
      })
      .when('/about/truth', {
        templateUrl: 'views/about-truth.html',
        controller: 'AboutTruthCtrl',
        controllerAs: 'vm',
        title: 'Truth Central | McCann Worldgroup',
        description: 'McCann Worldgroup is dedicated to uncovering the world’s untold truths. These global case studies look at human nature from a fresh perspective'
      })
      .when('/about/leadership', {
        templateUrl: 'views/about-people.html',
        controller: 'AboutPeopleCtrl',
        controllerAs: 'vm',
        title: 'Leadership | McCann Worldgroup',
        description: 'Meet the McCann Worldgroup leadership team, a collection of marketing experts with cross-discipline fluency'
      })
      .when('/about/leadership/:slug', {
        templateUrl: 'views/about-people.html',
        controller: 'AboutPeopleCtrl',
        controllerAs: 'vm',
      })
      .when('/404', {
        templateUrl: 'views/404.html',
        controller: '404Ctrl',
        controllerAs: 'vm',
        title: 'Not Found | McCann Worldgroup'
      })
      .otherwise({
        redirectTo: '/404'
      });
  })
  .config(function(scrollMagicProvider) {
    // scrollMagicProvider.addIndicators = true;
  })
  .run(function($rootScope, wpService, $window, $location) {

    svg4everybody();

    //Current Year for Footer
    $rootScope.currentYear = new Date().getFullYear();

    $rootScope.baseAPIpath = 'http://ec2-52-14-24-43.us-east-2.compute.amazonaws.com/';

    //Prefetch data feeds
    // wpService.getNews(20, 1);
    wpService.getFeaturedNews();
    wpService.getFeaturedWorkItems();
    wpService.getCareers();
    wpService.getExpertise();
    wpService.getAgencies();

    // adding shuffle method to Array (mutator)
    Array.prototype.shuffle = function() {
      var i, j, temp = null;
      for (i = this.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
      }
      return this;
    };

    // shuffle elements in a jQuery collection
    $.fn.shuffle = function() {
      var i, j, temp = null;
      for (i = this.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
      }
      return this;
    };


    var checkResize = _.debounce(function() {
        // $rootScope.isMobile = window.getComputedStyle(document.body, ':after').content === '"mobile"';
        if (angular.element($window).width() < 768) {
          $rootScope.isMobile = true;
          $rootScope.isTablet = false;
        } else if (angular.element($window).width() >= 768 && angular.element($window).width() < 1200) {
          $rootScope.isMobile = false;
          $rootScope.isTablet = true;
        } else {
          $rootScope.isMobile = false;
          $rootScope.isTablet = false;
        }
        $rootScope.$apply();
      }, 250);


    angular.element($window).bind('resize', checkResize);
    checkResize();


    $rootScope.mobileSocialFooter = false;
    $rootScope.toggleSocialFooter = function() {
      $rootScope.mobileSocialFooter = !$rootScope.mobileSocialFooter;
    };

    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
      $rootScope.title = current.title;
      $rootScope.description = current.description;
    });

  })
  .filter('ellipsis', function() {
    return function(value, wordwise, max, tail) {
      if (!value) return '';

      max = parseInt(max, 10);
      if (!max) return value;
      if (value.length <= max) return value;

      value = value.substr(0, max);
      if (wordwise) {
        var lastspace = value.lastIndexOf(' ');
        if (lastspace !== -1) {
          //Also remove . and , so its gives a cleaner result.
          if (value.charAt(lastspace - 1) === '.' || value.charAt(lastspace - 1) === ',') {
            lastspace = lastspace - 1;
          }
          value = value.substr(0, lastspace);
        }
      }

      return value + (tail || '...');
    };
  })
  .directive('agencySvg', function() {
    return function(scope, el, attrs) {
      var url = attrs.agencySvg;
      el.attr('xlink:href', '../images/0_home_logo_' + url + '.svg#' + url);
    }
  });