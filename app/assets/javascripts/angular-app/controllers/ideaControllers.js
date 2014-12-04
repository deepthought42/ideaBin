var app = angular.module('ideaBin.ideaControllers', [
				'ngStorage']
			);

app.controller("IdeaIndexCtrl", ['$scope', '$localStorage', 'Idea', '$location',
	function($scope, $localStorage, Idea, $location) {
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
		$scope.ideaForm.name = "NAME";
		$scope.ideaForm.description = "DESCRIPTION";
		$scope.createNewIdea = function(){
			Idea.create($scope.ideaForm);
			$location.path('/ideas');
		}
	}
]);