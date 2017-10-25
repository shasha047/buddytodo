angular.module('buddytodo').controller('assignedController', assignedController);

function assignedController($http,$location, $window, AuthFactory, jwtHelper,$route) {
  var vm = this;

  vm.changestatus = function(name,creator_email,task_id){
  
    if(AuthFactory.isLoggedIn){
        
              if($window.sessionStorage.token){
        
                
                var token = $window.sessionStorage.token;
                var decodedToken = jwtHelper.decodeToken(token);
                vm.loggedInUser = decodedToken.email;
                
              
                var list = {
                  creator_email: creator_email,
                  name:name,
                  buddy_email:vm.loggedInUser,
                  task_id:task_id
                };
                console.log("list",list);
                
                    $http.post('/api/btodo/status', list).then(function(result) {
                      console.log("result ",result);
                      alert(result.data);
                        // $location.path('/assigned');
                        // $route.reload();
                        $window.location.reload();
                    }).catch(function(error) {
                      console.log(error);
                      alert(error.data);
                    //   $location.path('/assigned');
                        // $route.reload();
                        $window.location.reload();
                    });
                  
        
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
  

  vm.assigned = function() {
  
    if(AuthFactory.isLoggedIn){

      if($window.sessionStorage.token){

        
        var token = $window.sessionStorage.token;
        var decodedToken = jwtHelper.decodeToken(token);
        vm.loggedInUser = decodedToken.email;
        var email_url = vm.loggedInUser.split("@").join("%40");
        var url = '/api/btodo/task/assigned/'+email_url;

        $http.get(url).then(function(result){
            console.log(result);
            vm.lists=result.data;
        }).catch(function(error){
            console.log(error);
        })
      
        

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
