var app = angular.module('ideaBin.ideaControllers', []);

app.controller("IdeaIndexController", ['$scope', '$localStorage', '$sessionStorage', 'Idea', 'Repository','$location', '$http', '$rootScope',
	function($scope, $localStorage, $sessionStorage, Idea, Repository, $location, $http, $rootScope) {
	$scope.$storage = $localStorage;
	$scope.ideas = Idea.query();
	$scope.$session = $sessionStorage;

	$scope.deleteIdea =  function(idea){
		if(confirm("Are you sure you want to delete "+idea.name +"?")){
			Idea.delete({id: idea.id});
			var index = $scope.ideas.indexOf(idea);
			$scope.ideas.splice(index, 1);
		}
	}

	$scope.createNewIdea = function(){
		Idea.create();
		$location.path('/ideaIdx');
	};

	$scope.editIdea = function (ideaId) {
		$scope.$storage.current_idea  = Idea.show({id: ideaId}).$promise;
		$scope.$storage.current_idea.then(function onSuccess(response){
			$scope.$storage.current_idea.idea = response.idea;
			$scope.$storage.current_idea.user= response.user;



				$rootScope.$broadcast("getContributingUserCount", $scope.$storage.current_idea.idea)
				$rootScope.$broadcast("getCommitCount", $scope.$storage.current_idea.idea)
				$rootScope.$broadcast("getLikeCount", $scope.$storage.current_idea.idea)

				//if user is signed in then get repo
				// otherwise get repository for owner
			if($scope.$session.user){
				$scope.$storage.repo = Repository.show(
					{
						user_id: $scope.$session.user.id,
						id: ideaId
					}
				).$promise;
			}
			else{
				$scope.$storage.repo = Repository.show(
					{
						user_id: $scope.$storage.current_idea.idea.user_id,
						id: ideaId
					}
				).$promise;
			}
			$scope.$storage.repo.then(function onSuccess(response){
				$scope.$storage.repo = response;

				$rootScope.$broadcast("loadDirectory", $scope.$storage.repo.path )
				$rootScope.$broadcast("loadResources", $scope.$storage.repo.path)
				$rootScope.$broadcast("loadRepositoryComments")

				if($scope.$session.user && $scope.$session.user.id === $scope.$storage.current_idea.idea.user_id){
					$rootScope.$broadcast("getSubmittedPullRequests", $scope.$storage.repo.id)
				}
				else {
					delete $scope.$storage.submittedPullRequestCount;
				}

				},
				function onFail(response) {
						alert("failed to load idea for editing");
				});
			},
			function onFail(response) {
				alert("failed to load repo while opening idea for editing");
			});
			$location.path('/idea/'+ideaId);
		}

		$scope.showNewIdea = function(){
			$scope.isCreateIdeaPanelVisible = true;
		}

		$scope.$on('showMyIdeas', function(event, userId){
			$scope.showUserIdeas(userId);
		});

		$scope.$on('showAddIdea', function(event, data){
			$scope.showNewIdea();
		});

		$scope.$on('showAllIdeas', function(event, data){
			$scope.ideas = Idea.query();
		});

		$scope.$on('addIdeaToList', function(event, data){
			$scope.ideas.push(data);
		});

		$scope.showUserIdeas = function(userId){
			$http.get("/userIdeas/" + userId+".json")
			.success(function(data){
				$scope.ideas = data;
			})
			.error(function(data){
				alert(data.errors);
			});
		}

		$scope.$on('hideCreateIdeaPanel', function(event, data) {
			$scope.isCreateIdeaPanelVisible = false;
		});
}]);

app.controller('IdeaDetailCtrl', ['$scope', '$auth', '$localStorage', '$sessionStorage', 'Idea', '$upload', '$rootScope', '$http',
	function($scope, $auth, $localStorage, $sessionStorage, Idea, $upload, $rootScope, $http){
		$auth.validateUser();
		$scope.$storage = $localStorage;
		$scope.$session = $sessionStorage;
		$scope.idea = $scope.$storage.current_idea.idea;

		/**
		*
		*/
		$scope.uploadFile = function(){
			$scope.upload = $upload.upload({
				url: '/ideas/' + $scope.$storage.current_idea.idea.id + '/uploadCover.json',
				method: 'PUT',
				file: $scope.cover_img,
				fileFormDataName: 'cover_img'
			}).
			progress(function(evt) {
				console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total));
			}).success(function(data, status, headers, config) {
				$scope.idea  = Idea.show({id: $scope.$storage.current_idea.idea.id});
				$scope.idea.then(function onSuccess(response){
					$localStorage.current_idea = response;
					$scope.$apply(function () {
						$scope.idea = $scope.cover_img.filename;
					});
				},
				function onFail(response) {
					$('.error').html("Could not upload file. Response was " + response);
				});
				console.log('file ' + config.file + ' was uploaded successfully. Status: ' + status);
			});
		};

		/**
		*
		*/
		$scope.updateIdea = function(){
			Idea.update($scope.$storage.current_idea.idea)
			$scope.editDescription=false
			$scope.editName=false
		};

		$scope.$watch("editDescription", function(){})
		/**
		*
		*/
		$scope.showIdeaEditPanel = function() {
			$("#ideaEditPanel").show();
		};

		/**
		*
		*/
		$scope.hideIdeaEditPanel = function() {
			$("#ideaEditPanel").hide();
		};

		/**
		*
		*/
		$scope.$on('getContributingUserCount', function(event, idea) {
			$http.get("/ideas/" + idea.id+"/contributingUserCount.json")
				.success(function(data){
					$scope.contributingUserCount = data.user_count;
				})
				.error(function(data){
					alert(data.errors);
					$scope.contributingUserCount = -1
				});
		});

		/**
		*
		*/
		$scope.$on('getCommitCount', function(event, idea) {
			$http.get("/ideas/" + idea.id+"/commitCount.json")
				.success(function(data){
					$scope.commitCount = data.commit_count;
				})
				.error(function(data){
					alert(data.errors);
					$scope.commitCount = -1
				});
		});


		/**
		*
		*/
		$scope.showNewIdea = function(){
			$rootScope.isCreateIdeaPanelVisible = true;
		};

		/**
		*
		*/
		$scope.showNewDirectoryPanel = function(){
			$('#directoryForm').slideToggle().delay(100);
		};

		/**
		*
		*/
		$scope.showPullRequestCreatePanel = function(){
			$rootScope.$broadcast('showPullRequestCreatePanel');
		};

		/**
		*
		*/
		$scope.likeIdea = function(){
			$http.get("/ideas/" + $scope.$storage.current_idea.idea.id+"/like.json")
				.success(function(data){
					$scope.likeCount = data.like_count;
					$scope.$storage.current_idea.idea.liked_by_user = data.liked_by_user
				})
				.error(function(data){
					alert(data.errors);
					$scope.likeCount = data.like_count
					$scope.error = data.errors
				});
		}


		/**
		*	watches the likeCount variable for changes
		*/
		$scope.$watch('likeCount', function(){
		});

		/**
		*
		*/
		$scope.$on('getLikeCount', function(event, idea) {
			$http.get("/ideas/" + $scope.$storage.current_idea.idea.id+"/likeCount.json")
				.success(function(data){
					$scope.likeCount = data.like_count;
					$scope.$storage.current_idea.idea.liked_by_user = data.liked_by_user
				})
				.error(function(data){
					alert(data.errors);
					$scope.likeCount = data.like_count
					$scope.error = data.errors
				});
		})
	}
]);

app.controller('IdeaCreationCtrl', ['$scope', '$auth', '$rootScope', 'Idea', '$upload', '$location',
	function($scope, $auth, $rootScope, Idea, $upload, $location ){
		//callback for ng-click 'createNewIdea'
		$auth.validateUser();
		$scope.ideaForm = {};
		$scope.ideaForm.name = "";
		$scope.ideaForm.description = "";
		$scope.ideaForm.cover_img = "";
		$scope.logo_url = '/images/missing.png';
		$scope.serverValidations = false;

		$scope.createNewIdea = function(isValid){
			if(isValid){
				$scope.uploadFile();
			}
		}

		$scope.uploadFile = function(){
			$scope.$upload = $upload.upload({
				url: '/ideas.json',
				method: 'POST',
				data: {idea: $scope.idea},
				file: $scope.cover_img,
  			fileFormDataName: 'cover_img'
			}).
			progress(function(evt) {
				console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total));
			}).success(function(data, status, headers, config) {
				$rootScope.$broadcast('hideCreateIdeaPanel');
				$rootScope.$broadcast('addIdeaToList', data.data);
				$location.path('/ideaIdx');
			}).error(function(data, status, headers, config) {
				console.log("data :: " + data['errors'].name)
				$scope.serverValidations = data;
			});
		}

		$scope.previewImage = function(files){
			var reader = new FileReader();
			if(typeof files[0] === 'object'){
				reader.readAsDataURL(files[0]);
			}
			reader.onload = function(event){
				$scope.logo_url = reader.result;
				$scope.ideaForm.cover_img = files[0];
				$scope.$apply()
			}
		}

		$scope.hideCreateIdeaPanel = function(){
			$rootScope.$broadcast('hideCreateIdeaPanel');
		}
	}
]);

app.controller('IdeaNavigationController', ['$scope', '$rootScope', '$auth', '$localStorage', '$sessionStorage', 'Idea', '$upload', '$location',
	function($scope, $rootScope, $auth, $localStorage, $sessionStorage, Idea, $upload, $location ){
		//callback for ng-click 'createNewIdea'
		$scope.session = $sessionStorage;
		$scope.storage = $localStorage;

		/**
		*
		*/
		$scope.showPullRequestIndexPage = function() {
			$rootScope.$broadcast("showAllPullRequests", $localStorage.repo.id);
			$("#pullRequestDetailsPanel").hide();
			$("#RepositoryCommentIndexPanel").hide();
			$("#resourceEditPanel").hide();
			$("#pullRequestIndexPanel").show();
		};
}])
