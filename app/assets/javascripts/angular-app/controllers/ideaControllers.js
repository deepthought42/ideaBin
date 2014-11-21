var app = angular.module('ideaBin.controllers', []);

app.controller("IdeaIndexCtrl", ['$scope', 'IdeaFactory', 'IdeasFactory', '$location',
	function($scope, IdeaFactory, IdeasFactory) {
		$scope.ideas = IdeasFactory.query();
		
		$scope.editIdea = function(ideaId){
			IdeaFactory.show({id: ideaId});
			//$location.path('/user-detail/'+userId);
		};
		
		$scope.deleteIdea =  function(ideaId){
			IdeaFactory.delete({id: ideaId});
			$scope.ideas = IdeasFactory.query();
		}
		
		$scope.createNewIdea = function(){
			//$location.path('/idea-creation');
		};
}]);

app.controller('IdeaDetailCtrl', ['$scope', '$routeParams', 'IdeaFactory', '$location',
	function($scope, $routeParams, IdeaFactory){
		$scope.updateIdea = function (){
			IdeaFactory.update($scipe.idea);
			//$location.path('/idea-list');
		}
		
		
		$scope.cancel = function(){
			//$location.path('/idea-list');
		}
		
		$scope.idea = IdeaFactory.show({id: $routeParams.id});
	}
]);

app.controller('IdeaCreationCtrl', ['$scope', 'IdeasFactory', '$location',
	function($scope, IdeasFactory, $location){
		//callback for ng-click 'createNewIdea'
		$scope.createNewIdea = function(){
			IdeasFactory.create($scope.idea);
			//$location.path('/idea-list');
		}
	}
	]);