var app = angular.module('ideaBin.ideaControllers', []);

app.controller("IdeaIndexCtrl", ['$scope', '$localStorage', 'Idea', '$location', '$http', '$rootScope',
	function($scope, $localStorage, Idea, $location, $http, $rootScope) {
		$scope.$storage = $localStorage;
		$scope.ideas = Idea.query();
		
  	$scope.deleteIdea =  function(ideaId){
			Idea.delete({id: ideaId});
			$scope.ideas = Idea.query();
		}
		
		$scope.createNewIdea = function(){
			Idea.create();
			$location.path('/ideas');
		};
		
		$scope.editIdea = function (ideaId) {
			$localStorage.current_idea  = Idea.show({id: ideaId}).$promise;
			$localStorage.current_idea.then(function onSuccess(	response){
				$localStorage.current_idea = response;
				$rootScope.$broadcast("loadTopDirectory", $localStorage.current_idea.id )
			},
			function onFail(response) {
					// handle failure
			});

			$location.path('/ideas/'+ideaId);
		}
		
		$scope.showNewIdea = function(){
			$scope.isCreateIdeaPanelVisible = true;
		}
	
		$scope.showMyIdeas = function(){
			$location.path('/ideas');
		}
		
		$rootScope.$on('hideCreateIdeaPanel', function(event, data) {
			$scope.isCreateIdeaPanelVisible = false;
		});
}]);

app.controller('IdeaDetailCtrl', ['$scope', '$localStorage', '$routeParams', 'Idea', '$location', '$upload', '$rootScope',
	function($scope, $localStorage, $routeParams, Idea, $location, $upload, $rootScope){
		$scope.$storage = $localStorage;
		$scope.idea = Idea.show({id: $routeParams.id});
		$rootScope.ideaEditPanelVisible = false;

		$scope.uploadFile = function(){
			var ideaFormVals = angular.toJson($scope.idea);
			$scope.upload = $upload.upload({
				url: '/ideas/' + $scope.idea.id + '/uploadCover.json',
				method: 'PUT',
				data: {idea: ideaFormVals},
				file: $scope.cover_img,
				fileFormDataName: 'cover_img'
			}).
			progress(function(evt) {
				console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total));
			}).success(function(data, status, headers, config) {
				$scope.idea  = Idea.show({id: $scope.$storage.current_idea.id});
				$scope.idea.then(function onSuccess(	response){
					$localStorage.current_idea = response;
					$scope.$apply(function () {
							$scope.idea = $scope.cover_img.filename;
							$scope.message = "Timeout called!";
					});
				},
				function onFail(response) {
						// handle failure
				});
				console.log('file ' + config.file + ' was uploaded successfully. Status: ' + status);
			});
		}
		
		$scope.updateIdea = function (ideaId){
			$scope.uploadFile();
			Idea.update($scope.idea,{id: ideaId}, function(){
					$location.path('/ideas');
			});
		}
		
		$scope.showIdeaEditPanel = function() {
			$rootScope.ideaEditPanelVisible = true;
		}
		
		$scope.hideIdeaEditPanel = function() {
			$rootScope.ideaEditPanelVisible = false;
		}
		
		$scope.cancel = function(){
			$location.path('/ideas');
		}
		
		$scope.showNewIdea = function(){
			$rootScope.isCreateIdeaPanelVisible = true;
		}
		
		$scope.showNewDirectoryPanel = function(){
			$rootScope.$broadcast("showNewDirectoryPanel");
		}
	}
]);

app.controller('IdeaCreationCtrl', ['$scope', '$rootScope', 'Idea', '$location', '$upload',
	function($scope, $rootScope, Idea, $location, $upload ){
		//callback for ng-click 'createNewIdea'
		$scope.ideaForm = {};
		$scope.ideaForm.name = "";
		$scope.ideaForm.description = "";
		$scope.ideaForm.cover_img_file_name = "no-image-found.png";

		$scope.createNewIdea = function(){
			//Take the first selected file
			$scope.uploadFile();
			//Idea.create($scope.ideaForm);
		}
		
		$scope.uploadFile = function(){
			var ideaFormVals = angular.toJson($scope.ideaForm);
			$scope.$upload = $upload.upload({
				url: '/ideas.json',
				method: 'POST',
				data: {idea: ideaFormVals},
				file: $scope.cover_img,
        fileFormDataName: 'cover_img'
			}).
			progress(function(evt) {
				console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total));
			}).success(function(data, status, headers, config) {
				console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);
			});
		}
		
		$scope.previewImage = function(files){
			var reader = new FileReader();
			reader.readAsDataURL(files[0]);
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