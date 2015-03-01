var app = angular.module('ideaBin.ideaControllers', []);

app.controller("IdeaIndexCtrl", ['$scope', '$localStorage', 'Idea', '$location', '$http',
	function($scope, $localStorage, Idea, $location, $http) {
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
			},
			function onFail(response) {
					// handle failure
			});
			
			$http({method: "GET", url: "/directories/" + ideaId + "/topDir.json"})
				.success(function(data){ 
						$scope.$storage.current_directory = data;
				})
				.error(function(data){
					alert("Failed to load Directory!");
				});
				
			$location.path('/ideas/'+ideaId)
		}
		
		$scope.newIdea = function(){
			$location.path('/ideas/new');
		}
}]);

app.controller('IdeaDetailCtrl', ['$scope', '$localStorage', '$routeParams', 'Idea', '$location', '$upload',
	function($scope, $localStorage, $routeParams, Idea, $location, $upload){
		$scope.$storage = $localStorage;
		$scope.idea = Idea.show({id: $routeParams.id});
		
		$scope.uploadFile = function(){
			console.log("COVER IMAGE :: " + $scope.cover_img);
			var ideaFormVals = angular.toJson($scope.idea);
			$scope.upload = $upload.upload({
				url: '/ideas/' + $scope.idea.id + '.json',
				method: 'PUT',
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
		
		$scope.updateIdea = function (ideaId){
			$scope.uploadFile();
			Idea.update($scope.idea,{id: ideaId}, function(){
					$location.path('/ideas');
			});
		}
		
		$scope.cancel = function(){
			$location.path('/ideas');
		}
	}
]);

app.controller('IdeaCreationCtrl', ['$scope', 'Idea', '$location', '$upload',
	function($scope, Idea, $location, $upload ){
		//callback for ng-click 'createNewIdea'
		$scope.ideaForm = {};
		$scope.ideaForm.name = "";
		$scope.ideaForm.description = "";
		$scope.createNewIdea = function(){
			//Take the first selected file
			console.log("COVER IMAGE :: " + $scope.cover_img);
			var ideaFormVals = angular.toJson($scope.ideaForm);
			$scope.upload = $upload.upload({
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
			//Idea.create($scope.ideaForm);
			
			$location.path('/ideas');
		}
	}
]);