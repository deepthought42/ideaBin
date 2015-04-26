var app = angular.module('ideaBin.ideaControllers', []);

app.controller("IdeaIndexController", ['$scope', '$localStorage', '$sessionStorage', 'Idea', 'Repository','$location', '$http', '$rootScope',
	function($scope, $localStorage, $sessionStorage, Idea, Repository, $location, $http, $rootScope) {
	$scope.$storage = $localStorage;
	$scope.ideas = Idea.query();
	$scope.$session = $sessionStorage;
  	$scope.deleteIdea =  function(idea){
		Idea.delete({id: idea.id});
		var index = $scope.ideas.indexOf(idea);
		$scope.ideas.splice(index, 1);
	}
		
	$scope.createNewIdea = function(){
		Idea.create();
		$location.path('/ideas');
	};
	
	$scope.editIdea = function (ideaId) {
		$scope.$storage.current_idea  = Idea.show({id: ideaId}).$promise;
		$scope.$storage.current_idea.then(function onSuccess(response){
			$scope.$storage.current_idea = response;
			$scope.$storage.repo = Repository.show(
				{user_id: $scope.$session.user.id, 
				 id: ideaId}
			).$promise;
			$localStorage.repo.then(function onSuccess(response){
				$scope.$storage.repo = response;

				$rootScope.$broadcast("loadDirectory", $scope.$storage.repo.path )
				$rootScope.$broadcast("loadResources", $scope.$storage.repo.path)
				$rootScope.$broadcast("getSubmittedPullRequests", $scope.$storage.repo.id)
				$rootScope.$broadcast("loadRepositoryComments")
				},
				function onFail(response) {
						alert("failed to load idea for editing");
				});
			},
			function onFail(response) {
				alert("failed to load repo while opening idea for editing");
			});
			$location.path('/ideas/'+ideaId);
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

app.controller('IdeaDetailCtrl', ['$scope', '$localStorage', '$sessionStorage', '$routeParams', 'Idea', '$location', '$upload', '$rootScope', '$http',
	function($scope, $localStorage, $sessionStorage, $routeParams, Idea, $location, $upload, $rootScope, $http){
		$scope.$storage = $localStorage;
		$scope.$session = $sessionStorage;

		$scope.convertToInput = function(id, val) {
			$("#"+id).html("<input type='text' value='" + val + "' /><span class='fa fa-save'></span>'")
		}

		$scope.uploadFile = function(){

			$scope.upload = $upload.upload({
				url: '/ideas/' + $scope.$storage.current_idea.id + '/uploadCover.json',
				method: 'PUT',
				data: {idea: angular.toJson($scope.current_idea)},
				file: $scope.cover_img,
				fileFormDataName: 'cover_img'
			}).
			progress(function(evt) {
				console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total));
			}).success(function(data, status, headers, config) {
				$scope.idea  = Idea.show({id: $scope.$storage.current_idea.id});
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
		
		$scope.updateIdea = function (ideaId){
			$scope.uploadFile();
			Idea.update($scope.idea,{id: ideaId}, function(){
					$location.path('/ideas');
			});
		};
		
		$scope.showIdeaEditPanel = function() {
			console.log("showing edit panel");
			$("#ideaEditPanel").show();
		};
		
		$scope.hideIdeaEditPanel = function() {
						console.log("hiding edit panel");

			$("#ideaEditPanel").hide();
		};
		
		$scope.showPullRequestIndexPage = function() {
			$rootScope.$broadcast("showAllPullRequests", $localStorage.repo.id);
			$("#pullRequestDetailsPanel").hide();
			$("#RepositoryCommentIndexPanel").hide();
			$("#resourceEditPanel").hide();
			$("#pullRequestIndexPanel").show();
		};
		
		$scope.showNewIdea = function(){
			$rootScope.isCreateIdeaPanelVisible = true;
		};
		
		$scope.showNewDirectoryPanel = function(){
			$('#directoryForm').slideToggle().delay(100);
		};
		
		$scope.showPullRequestCreatePanel = function(){
			$rootScope.$broadcast('showPullRequestCreatePanel');
		};
	}
]);

app.controller('IdeaCreationCtrl', ['$scope', '$auth', '$rootScope', 'Idea', '$location', '$upload',
	function($scope, $auth, $rootScope, Idea, $location, $upload ){
		//callback for ng-click 'createNewIdea'
		$auth.validateUser();
		$scope.ideaForm = {};
		$scope.ideaForm.name = "";
		$scope.ideaForm.description = "";
		$scope.ideaForm.cover_img = "";

		$scope.createNewIdea = function(){
			$scope.uploadFile();
		}
		
		$scope.uploadFile = function(){

			$scope.$upload = $upload.upload({
				url: '/ideas.json',
				method: 'POST',
				data: {idea: $scope.ideaForm},
				file: $scope.cover_img,
        			fileFormDataName: 'cover_img'
			}).
			progress(function(evt) {
				console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total));
			}).success(function(data, status, headers, config) {
				//console.log('file ' + $scope.cover_img.name + 'is uploaded successfully. Response: ' + data);
				$rootScope.$broadcast('hideCreateIdeaPanel');
				$rootScope.$broadcast('addIdeaToList', data.data);
			});
		}
		
		$scope.previewImage = function(files){
			var reader = new FileReader();
			if(typeof files[0] === 'Blob'){
				reader.readAsDataURL(files[0]);
			}
			reader.onload = function(event){
				$('#ideaCreationImage').attr('src', reader.result);
				$scope.ideaForm.cover_img = files[0];
			}
		}
		
		$scope.hideCreateIdeaPanel = function(){
			$rootScope.$broadcast('hideCreateIdeaPanel');
		}
	}
]);
