angular.module('buddytodo').controller('createdController', createdController);

function createdController($http,$location, $window, AuthFactory, jwtHelper) {
  var vm = this;

//   vm.deletelist = function(list_id){
//     if(AuthFactory.isLoggedIn){
        
//               if($window.sessionStorage.token){
        
                
//                 // var token = $window.sessionStorage.token;
//                 // var decodedToken = jwtHelper.decodeToken(token);
//                 // vm.loggedInUser = decodedToken.email;
                
              
//                 // var newlist = {
//                 //   buddy_email: buddy_email,
//                 //   name:name,
//                 //   creator_email:vm.loggedInUser
//                 // };
//                 // console.log("newlist",newlist);
                
//                     $http.post('/api/btodo/deletelist', list_id).then(function(result) {
//                       console.log("result ",result);
//                       alert(result.data);
//                       $window.location.reload();
        
//                     }).catch(function(error) {
//                       console.log(error);
//                       alert(error.data);
//                       $window.location.reload();
//                     });
                  
        
//                 }
//                 else{
//                   vm.error = "Please do login first";
//                 }
//               }
//               else{
//                 AuthFactory.isLoggedIn = false;
//                 delete $window.sessionStorage.token;
//                 $location.path('/');
//               }
            
//   };

  vm.migrate = function(){
    $location.path('/addtask');
  };

  vm.created = function() {
  
    if(AuthFactory.isLoggedIn){

      if($window.sessionStorage.token){

        
        var token = $window.sessionStorage.token;
        var decodedToken = jwtHelper.decodeToken(token);
        vm.loggedInUser = decodedToken.email;
        var email_url = vm.loggedInUser.split("@").join("%40");
        var url = '/api/btodo/task/created/'+email_url;

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
