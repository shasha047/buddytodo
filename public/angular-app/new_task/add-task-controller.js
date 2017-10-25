angular.module('buddytodo').controller('addtaskController', addtaskController);

function addtaskController($http,$location, $window, AuthFactory, jwtHelper) {
  var vm = this;

  vm.addtask = function() {
  
    if(AuthFactory.isLoggedIn){

      if($window.sessionStorage.token){

        
        var token = $window.sessionStorage.token;
        var decodedToken = jwtHelper.decodeToken(token);
        vm.loggedInUser = decodedToken.email;
      
      
        var newtask = {
          buddy_email: vm.buddy_email,
          name:vm.name,
          loggedin_email:vm.loggedInUser,
          creator_email:vm.creator_email,
          content:vm.content
        };
        console.log("newtask",newtask);
        if (!vm.buddy_email || !vm.name || !vm.content) {
          vm.error = 'Please add a buddy email, list name and content. All are required';
        }
        else {
            $http.post('/api/btodo/task', newtask).then(function(result) {
              console.log("result ",result);
              vm.message = result.data;
              vm.error = '';

            }).catch(function(error) {
              console.log(error);
                vm.error = error.data;
            });
          }
        }
        else{
          vm.error = "Please do login first";
        }
      }
      else{
        AuthFactory.isLoggedIn = false;
        delete $window.sessionStorage.token;
        $location.path('/');
      }
    }
  
};
