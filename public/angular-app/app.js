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
    .when('/created', {
      templateUrl: 'angular-app/created_tasks/created.html',
      controller: createdController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .when('/assigned', {
      templateUrl: 'angular-app/assigned_tasks/assigned.html',
      controller: assignedController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .when('/addlist', {
      templateUrl: 'angular-app/new_list/addlist.html',
      controller: addlistController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .when('/addtask', {
      templateUrl: 'angular-app/new_task/addtask.html',
      controller: addtaskController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
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
