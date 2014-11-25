var app = angular.module('ideaBin.resourceControllers', []);

app.controller("ResourceIndexCtrl", ['$scope', '$routeParams', 'ResourceFactory', '$location',
	function($scope, $routeParams, ResourceFactory, $location) {
		$scope.resources = ResourceFactory.query({idea_id: $routeParams.id});
		
		$scope.showResourceFactorys = function(ideaId){
			$scope.resources = ResourceFactory.query();
			$location.path('/resources');
		}
		
  	$scope.deleteResourceFactory =  function(resourceId){
			ResourceFactoryFactory.delete({id: resourceId});
			$scope.resources = ResourceFactory.query();
		}
		
		$scope.createNewResourceFactory = function(){
			ResourceFactory.create();
			$location.path('/resources');
		};
		
		$scope.editResourceFactory = function (resourceId) {
			$location.path('/resources/'+resourceId);
		}
		
		$scope.newResourceFactory = function(){
			$location.path('/resources/new');
		}
}]);

app.controller('ResourceDetailCtrl', ['$scope', '$routeParams', 'ResourceFactory', '$location',
	function($scope, $routeParams, ResourceFactory, $location){
		$scope.resource = ResourceFactoryFactory.show({id: $routeParams.id});
		
		$scope.updateResourceFactory = function (){
			ResourceFactory.update($scope.resource);
			$location.path('/resources');
		}
		
		$scope.cancel = function(){
			$location.path('/resources');
		}
	}
]);

app.controller('ResourceCreationCtrl', ['$scope', 'ResourceFactorysFactory', '$location',
	function($scope, ResourceFactorysFactory, $location ){
		//callback for ng-click 'createNewResourceFactory'
		$scope.resourceForm = {};
		$scope.resourceForm.name = "NAME";
		$scope.resourceForm.description = "DESCRIPTION";
		$scope.createNewResourceFactory = function(){
			console.log($scope.resourceForm)
			ResourceFactory.create($scope.resourceForm);
			$location.path('/resources');
		}
	}
]);