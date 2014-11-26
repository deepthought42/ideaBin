var app = angular.module('ideaBin.ideaControllers', []);

app.controller("IdeaIndexCtrl", ['$scope', 'Idea', '$location',
	function($scope, Idea, $location) {
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
			$location.path('/ideas/'+ideaId+'/edit');
		}
		
		$scope.showIdea = function(){
			$location.path('/ideas/new');
		}
}]);

app.controller('IdeaDetailCtrl', ['$scope', '$routeParams', 'Idea', '$location',
	function($scope, $routeParams, Idea, $location){
		$scope.idea = Idea.show({id: $routeParams.id});
		
		$scope.updateIdea = function (){
			Idea.update($scope.idea);
			$location.path('/ideas');
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
			console.log($scope.ideaForm)
			Idea.create($scope.ideaForm);
			$location.path('/ideas');
		}
	}
]);