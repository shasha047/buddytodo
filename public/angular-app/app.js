angular.module('buddytodo', ['ngRoute', 'angular-jwt']).config(config).run(run);

function config($httpProvider, $routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $httpProvider.interceptors.push('AuthInterceptor');

  $routeProvider
    .when('/', {
      templateUrl: 'angular-app/main/main.html',
      access: {
        restricted: false
      }
    })
    // .when('/quesans', {
    //   templateUrl: 'angular-app/quesans-list/quesanswers.html',
    //   controller: qasController,
    //   controllerAs: 'vm',
    //   access: {
    //     restricted: false
    //   }
    // })
    // .when('/quesans/:id', {
    //   templateUrl: 'angular-app/quesans-display/quesans.html',
    //   controller: qaController,
    //   controllerAs: 'vm',
    //   access: {
    //     restricted: false
    //   }
    // })
    .when('/register', {
      templateUrl: 'angular-app/register/register.html',
      controller: RegisterController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    // .when('/profile', {
    //   templateUrl: 'angular-app/profile/profile.html',
    //   access: {
    //     restricted: true
    //   }
    // })
    .otherwise({
      redirectTo: '/'
    });
}

function run($rootScope, $location, $window, AuthFactory) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
      event.preventDefault();
      $location.path('/');
    }
  });
}
