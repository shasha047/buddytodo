angular.module('buddytodo').controller('addlistController', addlistController);

function addlistController($http,$location, $window, AuthFactory, jwtHelper) {
  var vm = this;

  vm.addlist = function() {
  
    if(AuthFactory.isLoggedIn){

      if($window.sessionStorage.token){

        
        var token = $window.sessionStorage.token;
        var decodedToken = jwtHelper.decodeToken(token);
        vm.loggedInUser = decodedToken.email;
      
      
        var newlist = {
          buddy_email: vm.buddy_email,
          list_name:vm.name,
          creator_email:vm.loggedInUser
        };
        console.log("newlist",newlist);
        if (!vm.buddy_email || !vm.name) {
          vm.error = 'Please add a buddy email and a list name. Both are required';
        }
        else {
            $http.post('/api/btodo/list', newlist).then(function(result) {
              console.log("result ",result);
              vm.message = result.data.message;
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
