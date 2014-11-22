var app = angular.module('ideaBin.controllers', []);

app.controller("IdeaIndexCtrl", ['$scope', 'IdeaFactory', 'IdeasFactory', '$location',
	function($scope, IdeaFactory, IdeasFactory) {
		$scope.ideas = IdeasFactory.query();
		
  	$scope.deleteIdea =  function(ideaId){
			IdeaFactory.delete({id: ideaId});
			$scope.ideas = IdeasFactory.query();
		}
		
		$scope.createNewIdea = function(){
			IdeasFactory.create();
			$location.path('/ideas');
		};
}]);

app.controller('IdeaDetailCtrl', ['$scope', '$routeParams', 'IdeaFactory', '$location',
	function($scope, $routeParams, IdeaFactory, $location){
		$scope.updateIdea = function (){
			IdeaFactory.update($scope.idea);
			$location.path('/ideas/'+$scope.idea.id );
		}
		
		$scope.editIdea = function (ideaId) {
			IdeaFactory.show({id: $routeParams.id});
			$location.path('/ideas/'+ideaId +"/edit");
		}
		
		$scope.showIdea = function(){
		
			$location.path('/ideas/new');
		}
		
		$scope.cancel = function(){
			$location.path('/ideas');
		}
		
		$scope.idea = IdeaFactory.show({id: $routeParams.id});
	}
]);

app.controller('IdeaCreationCtrl', ['$scope', 'IdeasFactory', '$location',
	function($scope, IdeasFactory, $location ){
		//callback for ng-click 'createNewIdea'
		$scope.ideaForm = {};
		$scope.ideaForm.name = "NAME";
		$scope.ideaForm.description = "DESCRIPTION";
		$scope.createNewIdea = function(){
			console.log($scope.ideaForm)
			IdeasFactory.create($scope.ideaForm);
			$location.path('/ideas');
		}
	}
]);