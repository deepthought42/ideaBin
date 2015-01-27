var app = angular.module('ideaBin.ideaControllers', [
				'ngStorage']
			);

app.controller("IdeaIndexCtrl", ['$scope', '$localStorage', 'Idea', '$location',
	function($scope, $localStorage, Idea, $location) {
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
			//Idea.show({id: ideaId});
			$scope.$storage.current_idea = Idea.show({id: ideaId});
			
			//console.log("IDEA ID :: " + ideas[id : ideaId]);
			$location.path('/ideas/'+ideaId);
		}
		
		$scope.showIdea = function(){
			$location.path('/ideas/new');
		}
}]);

app.controller('IdeaDetailCtrl', ['$scope', '$localStorage', '$routeParams', 'Idea', '$location',
	function($scope, $localStorage, $routeParams, Idea, $location){
		$scope.$storage = $localStorage;
		$scope.idea = Idea.show({id: $routeParams.id});

		$scope.updateIdea = function (ideaId){
			Idea.update($scope.idea,{id: ideaId}, function(){
					$location.path('/ideas');
			});
		}
		
		$scope.cancel = function(){
			$location.path('/ideas');
		}
	}
]);

app.controller('IdeaCreationCtrl', ['$scope', 'Idea', '$location',
	function($scope, Idea, $location ){
		//callback for ng-click 'createNewIdea'
		$scope.ideaForm = {};
		$scope.ideaForm.cover_img = "";
		$scope.ideaForm.name = "NAME";
		$scope.ideaForm.description = "DESCRIPTION";
		$scope.createNewIdea = function(){
			var fd = $scope.ideaForm
			//Take the first selected file
			fd.append("file", files[0]);
			Idea.create(fd);
			$location.path('/ideas');
		}
	}
]);