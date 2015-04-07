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
		$scope.user = $scope.$storage.user;
		
		$scope.$on('userAuthenticated', function(event, user){
				$scope.user = user;
		});
		
		$scope.showRegistrationForm = function(){
			$('#signInForm').hide();
			$('#userRegistrationForm').show();
		}
		
		$scope.showEditProfileForm = function(){
			$('#editProfileForm').show();
		}
		
		$scope.showSignInForm = function() {
			$('#userRegistrationForm').hide();
			$('#signInForm').show();
		}

		$scope.logout = function(user){
			Auth.logout().then(function(user) {
				$('#editProfileForm').hide();
			}, function(error) {
				// An error occurred logging out.
			});

			$scope.$on('devise:logout', function(event, oldCurrentUser) {
				alert($scope.$storage.user.email + "you're signed out now.");
				$scope.$storage.user = null;
				$scope.user = null;
			});
		}
		
		$scope.$on('userRegistered', function(event, data){
			$scope.user = data;
		})
		
		$scope.editProfile = function(){
			$scope.user = $scope.$storage.user;
		}
				
		$scope.previewImage = function(files){
			var reader = new FileReader();
			reader.readAsDataURL(files[0]);
			reader.onload = function(event){
				$('#userAvatar').attr('src', reader.result);
				$scope.userForm.avatar = files[0];
			}
		}
		
				
		$scope.uploadFile = function(){
			var ideaFormVals = angular.toJson($scope.userForm);
			$scope.$upload = $upload.upload({
				url: '/ideas.json',
				method: 'POST',
				data: {idea: userFormVals},
				file: $scope.avatar,
        fileFormDataName: 'avatar'
			}).
			progress(function(evt) {
				console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total));
			}).success(function(data, status, headers, config) {
				console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);
				$rootScope.$broadcast('hideEditUserPanel');
			});
		}
		
	}
]);

app.controller('UserDetailController', ['$scope', '$location', '$localStorage',
	function ($scope, $location, $localStorage) { 
		$scope.hideEditProfilePanel =  function(){
			$('#editProfileForm').hide();
		}
		
		$scope.uploadFile = function(){
			var ideaFormVals = angular.toJson($scope.user);
			$scope.upload = $upload.upload({
				url: '/ideas/' + $scope.user.id + '/uploadCover.json',
				method: 'PUT',
				data: {user: ideaFormVals},
				file: $scope.avatar,
				fileFormDataName: 'avatar'
			}).
			progress(function(evt) {
				console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total));
			}).success(function(data, status, headers, config) {
				$scope.user  = User.show({id: $scope.$storage.current_user.id});
				$scope.user.then(function onSuccess(	response){
					$localStorage.current_user = response;
					$scope.$apply(function () {
						$scope.user = $scope.avatar.filename;
						$scope.message = "Timeout called!";
					});
				},
				function onFail(response) {
					$('.error').html("Could not upload file. Response was " + response);
				});
				console.log('file ' + config.file + ' was uploaded successfully. Status: ' + status);
			});
		}
		
		$scope.updateUser = function (userId){
			$scope.uploadFile();
			User.update($scope.user,{id: userId}, function(){
					//close edit form panel
			});
		};
	}
	
	
]);

app.controller('UserAuthenticateController', ['$scope', '$rootScope', 'Auth', '$location', '$localStorage',
	function ($scope, $rootScope, Auth, $location, $localStorage) { 
		$scope.$storage = $localStorage;
		
		$scope.hideSignInPanel = function() {
			$('#signInForm').hide();
		}
	
		$scope.signIn = function(loginForm){
			var credentials = {
				email: $scope.loginForm.email,
				password: $scope.loginForm.password
			};
			
			//Authenticate with user credentials
			Auth.login(credentials).then(function(user) {
				$scope.$storage.user = user;
				$rootScope.$broadcast('userAuthenticated', user);
				console.log($scope.$storage.user); // => {id: 1, ect: '...'}
			}, function(error) {
				alert("Failed to log in");
					// Authentication failed...
			});
			
			$scope.$on('devise:login', function(event, currentUser) {
			});

			$scope.$on('devise:new-session', function(event, currentUser) {
					$scope.$storage.user = currentUser;
					$scope.hideSignInPanel();
					console.log("NEW SESSION USER VALUE :: " + $scope.$storage.user);
					$location.path('/ideas');
			});
		}
	}
]);

app.controller('UserRegisterController', ['$scope', 'Auth', '$location', '$localStorage',
	function ($scope, Auth, $location, $localStorage) { 
		$scope.hideRegistrationPanel = function(){
			$('#userRegistrationForm').hide();
		}
		$scope.register = function(){
			var credentials = {
				email: $scope.registrationForm.email,
				password: $scope.registrationForm.password,
				password_confirmation: $scope.registrationForm.confirmation_password
			};

			Auth.register(credentials).then(function(registeredUser) {
				//show some sort of statement that indicates they are welcome to enjoy
				alert("registered user :: " + registeredUser);
				$scope.uploadFile();
			}, function(error) {
				alert("Something went wrong during registration. Womp womp");
			});

			$scope.$on('devise:new-registration', function(event, user) {
				$scope.$storage.user = user;
				$rootScope.$broadcast('userRegistered', user);
				$location.path('/ideas');
			});
		}
	}
]);