// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var db = null;
angular.module('starter', ['ionic','ngCordova'])



.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('signin', {
          url: "/signin",
          templateUrl: "signin.html",
          controller: 'SignInCtrl'
        })

    
        .state('welcome', {
          url: "/welcome",
          templateUrl: "welcome.html",
		   controller: 'welcomeCtrl'
		  
        })
		
	
    
    $urlRouterProvider.otherwise("/signin");
})

.controller('SignInCtrl', function($scope, $state, $http,$cordovaSQLite,$location) {

	$scope.DoSSearchAction=function(sq){
	alert("Get all data");
	  var query = "SELECT user_name, user_email FROM user_info";
	 //alert(db);
	    $cordovaSQLite.execute(db, query, []).then(function(res) {
            if(res.rows.length > 0) {
                for(var i = 0; i < res.rows.length; i++) {                   
					alert("SELECTED -> " + res.rows.item(i).user_name + " " + res.rows.item(i).user_email);
                }
            } else {               
			alert("No results found");
            }
        }, function (err) {            
			alert("Error");
			
        });
	
		
	
	}
	
	
	
	
			
	
})
.controller('welcomeCtrl', function($scope, $state, $http,$ionicLoading) {

})

.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
	
	 window.plugins.sqlDB.copy("test.db", function() {
            db = $cordovaSQLite.openDB("test.db");
        }, function(error) {
            console.error("There was an error copying the database: " + error);
            db = $cordovaSQLite.openDB("test.db");
        });
  });
})
