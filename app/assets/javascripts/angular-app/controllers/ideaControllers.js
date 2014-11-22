var app = angular.module('ideaBin.controllers', []);

app.controller("IdeaIndexCtrl", ['$scope', 'IdeaFactory', 'IdeasFactory', '$location',
	function($scope, IdeaFactory, IdeasFactory, $location) {
		$scope.ideas = IdeasFactory.query();
		
  	$scope.deleteIdea =  function(ideaId){
			IdeaFactory.delete({id: ideaId});
			$scope.ideas = IdeasFactory.query();
		}
		
		$scope.createNewIdea = function(){
			IdeasFactory.create();
			$location.path('/ideas');
		};
		
		$scope.editIdea = function (ideaId) {
			//IdeaFactory.show({id: ideaId});
			$location.path('/ideas/'+ideaId);
		}
		
		$scope.showIdea = function(){
			$location.path('/ideas/new');
		}
}]);

app.controller('IdeaDetailCtrl', ['$scope', '$routeParams', 'IdeaFactory', '$location',
	function($scope, $routeParams, IdeaFactory, $location){
		$scope.idea = IdeaFactory.show({id: $routeParams.id});
		
		$scope.updateIdea = function (){
			IdeaFactory.update($scope.idea);
			$location.path('/ideas/'+$scope.idea.id );
		}
		
		$scope.cancel = function(){
			$location.path('/ideas');
		}
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