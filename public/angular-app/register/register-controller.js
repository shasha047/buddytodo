angular.module('buddytodo').controller('RegisterController', RegisterController);

function RegisterController($http) {
  var vm = this;

  vm.register = function() {
    var user = {
      email: vm.email,
      name:vm.name,
      password: vm.password
    };

    if (!vm.email || !vm.password) {
      vm.error = 'Please add an email and a password.';
    } else {
      if (vm.password !== vm.passwordRepeat) {
        vm.error = 'Please make sure the passwords match.';
      } else {
        $http.post('/api/users/register', user).then(function(result) {
          console.log("result ",result);
          vm.message = 'Successful registration, please login.';
          vm.error = '';
        }).catch(function(error) {
          console.log(error);
            vm.error = error.data.message;
        });
      }
    }
  }
};
