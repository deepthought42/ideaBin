'use strict'; 
/** 
  * @ngdoc function 
	* @name fakeLunchHubApp.controller:UserSessionsCtrl 
	* @description 
	* # UserSessionsCtrl 
	* Controller of the fakeLunchHubApp 
	*/ 
var app = angular.module('ideaBin.userControllers', []);

app.controller('UserSessionCtrl', ['$scope', 'Auth', '$location', '$localStorage',
	function ($scope, Auth, $location, $localStorage) { 
		$scope.$storage = $localStorage;
		
		$scope.signedIn = Auth.isAuthenticated;
		$scope.logout = Auth.logout;
		$scope.user = $scope.$storage.user;
		
		$scope.signIn = function(loginForm){
			var credentials = {
				email: $scope.loginForm.email,
				password: $scope.loginForm.password
			};
			
			//Authenticate with user credentials
			Auth.login(credentials).then(function(user) {
				$scope.$storage.user = user;
				console.log($scope.$storage.user); // => {id: 1, ect: '...'}
			}, function(error) {
				alert("Failed to log in");
					// Authentication failed...
			});
			
			$scope.$on('devise:login', function(event, currentUser) {
			});

			$scope.$on('devise:new-session', function(event, currentUser) {
					$scope.$storage.user = currentUser;
					console.log($scope.$storage.user);
					$location.path('/ideas');
			});
		
		}
					
		$scope.logout = function(user){
			Auth.logout().then(function(user) {
				alert($scope.$storage.user.email + "you're signed out now.");
			}, function(error) {
				// An error occurred logging out.
			});

			$scope.$on('devise:logout', function(event, oldCurrentUser) {
				$scope.$storage.user = {}
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
				$scope.$storage.user = user;
				$location.path('/ideas');
			});
		}
		
		$scope.editProfile = function(){
			$scope.user = $scope.$storage.user;
		}
	}
]);
