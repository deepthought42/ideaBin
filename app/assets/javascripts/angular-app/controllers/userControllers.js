'use strict'; 
/** 
  * @ngdoc function 
	* @name fakeLunchHubApp.controller:UserSessionsCtrl 
	* @description 
	* # UserSessionsCtrl 
	* Controller of the fakeLunchHubApp 
	*/ 
var app = angular.module('ideaBin.userControllers', []);

app.controller('UserSessionCtrl', ['$scope', 'Auth', '$location',
	function ($scope, Auth, $location) { 
	
	
	$scope.signIn = function(loginForm){
		var credentials = {
			email: $scope.loginForm.email,
			password: $scope.loginForm.password
		};
		
		//Authenticate with user credentials
		Auth.login(credentials).then(function(user) {
				console.log(user); // => {id: 1, ect: '...'}
		}, function(error) {
			alert("Failed to log in");
				// Authentication failed...
		});
		
		$scope.$on('devise:login', function(event, currentUser) {
			$location.path('/ideas');
		});

		$scope.$on('devise:new-session', function(event, currentUser) {
				// user logged in by Auth.login({...})
		});
	
	}
				
	$scope.logout = function(){
		Auth.logout().then(function(oldUser) {
			// alert(oldUser.name + "you're signed out now.");
		}, function(error) {
			// An error occurred logging out.
		});

		$scope.$on('devise:logout', function(event, oldCurrentUser) {
			// ...
		});
	}
	
	$scope.register = function(){
		var credentials = {
			email: $scope.registrationForm.email,
			password: $scope.registrationForm.password,
			password_confirmation: $scope.registrationForm.confirmation_password
		};

		Auth.register(credentials).then(function(registeredUser) {
			console.log(registeredUser); // => {id: 1, ect: '...'}
		}, function(error) {
			alert("Something went wrong during registration. Womp womp");
		});

		$scope.$on('devise:new-registration', function(event, user) {
			// ...
		});
	}
}]);
