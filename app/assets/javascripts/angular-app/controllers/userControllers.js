'use strict'; 
/** 
  * @ngdoc function 
	* @name fakeLunchHubApp.controller:UserSessionsCtrl 
	* @description 
	* # UserSessionsCtrl 
	* Controller of the fakeLunchHubApp 
	*/ 
var app = angular.module('ideaBin.userControllers', []);

app.controller('UserSessionCtrl', ['$scope', '$auth', '$location', '$sessionStorage',
	function ($scope, $auth, $location, $sessionStorage) { 

		$scope.$session = $sessionStorage;
		$scope.signedIn = $auth.validateUser();
		
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
			$auth.signOut()
			$scope.$on('auth:logout-success', function(event, oldCurrentUser) {
				$('#editProfileForm').hide();
				alert($scope.session.user.email + "you're signed out now.");
				$scope.$session.user = null;
			});

			$scope.$on('auth:logout-error', function(event, reason){
				alert("There was an error signing you out. REASON :: "+reason);
			})
		}
		
		$scope.$on('userRegistered', function(event, data){
			$scope.$session.user = data;
			$auth.validateUser();
		})
		
		$scope.editProfile = function(){
			$scope.user = $scope.$session.user;
		}
	}
]);

app.controller('UserDetailController', ['$scope', 'User', '$auth', '$location', '$sessionStorage', '$upload',
	function ($scope, User, $auth, $location, $sessionStorage, $upload) { 
		$scope.signedIn = $auth.isAuthenticated;
		$scope.user = $sessionStorage.user;
		
		$scope.hideEditProfilePanel =  function(){
			$('#editProfileForm').hide();
		}
		
		$scope.uploadFile = function(){
			$scope.upload = $upload.upload({
				url: '/users',
				method: 'PUT',
				data: {user: $scope.userForm},
				file: $scope.userForm.avatar,
				fileFormDataName: 'avatar'
			}).
			progress(function(evt) {
				console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total));
			}).success(function(data, status, headers, config) {
				console.log('file ' + config.file + ' was uploaded successfully. Status: ' + status);
			});
		}

		$scope.previewImage = function(files){
			var reader = new FileReader();
			reader.readAsDataURL(files[0]);
			reader.onload = function(event){
				$('#userAvatar').attr('src', reader.result);
				$scope.user_avatar = files[0];
			}
		}
		
		$scope.updateUser = function (user){
			/*$auth.updateAccount(user)
        		  .then(function(resp) { 
          		    alert("successfully updated user account");
			    // handle success response
        		  })
        		  .catch(function(resp) { 
			    alert("Error updating user account");
		            // handle error response
        		  });
*/
			$scope.uploadFile();
			//User.update($scope.user,{id: userId}, function(){
             			//close edit form panel
			//});
		};
	}
	
	
]);

app.controller('UserAuthenticateController', ['$scope', '$rootScope', '$auth', '$location', '$sessionStorage', '$http',
	function ($scope, $rootScope, $auth, $location, $sessionStorage, $http) { 
		$scope.$session = $sessionStorage;
		
		$scope.hideSignInPanel = function() {
			$('#signInForm').hide();
		}
	
		$scope.signIn = function(loginForm){
			var credentials = {
				email: $scope.loginForm.email,
				password: $scope.loginForm.password
			};
			
			//Authenticate with user credentials
			$auth.submitLogin(credentials).then(function(response) {
				$scope.$session.user = response.data;
				console.log(response.data)
				console.log($scope.$session.user); // => {id: 1, ect: '...'}
			}, function(error) {
				alert("Failed to log in");
			});
			
			$scope.$on('auth:login-success', function(event, currentUser) {
				$scope.$session.user = currentUser.data;
				$location.path('/ideas');
				$scope.hideSignInPanel();
			});
			
			$scope.$on('auth:login-error', function(event, currentUser) {
				alert("Error logging in");
			});
		}
	}
]);

app.controller('UserRegisterController', ['$scope', '$rootScope', '$auth', '$sessionStorage',
	function ($scope, $rootScope, $auth, $sessionStorage ) { 
		$scope.$session = $sessionStorage;		
		$scope.hideRegistrationPanel = function(){
			$('#userRegistrationForm').hide();
		}
		$scope.register = function(){
			var credentials = {
				email: $scope.registrationForm.email,
				password: $scope.registrationForm.password,
				password_confirmation: $scope.registrationForm.confirmation_password
			};

			$auth.submitRegistration(credentials).then(function(registeredUser) {
				//show some sort of statement that indicates they are welcome to enjoy
			}, function(error) {
				alert("Something went wrong during registration. Womp womp");
			});

			$scope.$on('auth:registration-email-success', function(event, user) {
				$rootScope.$broadcast('userRegistered', user);
				$('#userRegistrationForm').hide()
			});
		}
	}
]);
