// loggedinuser;

angular.module('buddytodo').controller('LoginController', LoginController);

function LoginController($http, $location, $window, AuthFactory, jwtHelper) {
  var vm = this;

  vm.isLoggedIn = function() {
    if (AuthFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };

  vm.login = function() {
    if (vm.email && vm.password) {
      var user = {
        email: vm.email,
        password: vm.password
      };

      $http.post('/api/users/login', user).then(function(response) {
        if (response.data.success) {
          $window.sessionStorage.token = response.data.token;
          AuthFactory.isLoggedIn = true;
          var token = $window.sessionStorage.token;
          var decodedToken = jwtHelper.decodeToken(token);
          vm.loggedInUser = decodedToken.email;
          // loggedinuser=vm.loggedInUser;
        }
      }).catch(function(error) {
        console.log(error);
        alert('either of email id or password is incorrect');
      })

    }
  }

  vm.logout = function() {
    AuthFactory.isLoggedIn = false;
    delete $window.sessionStorage.token;
    $location.path('/');
  }

  vm.isActiveTab = function(url) {
    var currentPath = $location.path().split('/')[1];
    return (url === currentPath ? 'active' : '');
  }
}
