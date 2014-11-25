var app = angular.module('ideaBin.resourceControllers', []);

app.controller("ResourceIndexCtrl", ['$scope', '$routeParams', 'ResourceFactory', 'ResourcesFactory', '$location',
	function($scope,$routeParams, ResourceFactory, ResourcesFactory, $location) {
		
		$scope.showResources = function(ideaId){
			$scope.resources = ResourcesFactory.query();
			$location.path('/resources');
		}
		
		$scope.resources = ResourcesFactory.query({id: $routeParams.id});
		
  	$scope.deleteResource =  function(resourceId){
			ResourceFactory.delete({id: resourceId});
			$scope.resources = ResourcesFactory.query();
		}
		
		$scope.createNewResource = function(){
			ResourcesFactory.create();
			$location.path('/resources');
		};
		
		$scope.editResource = function (resourceId) {
			$location.path('/resources/'+resourceId);
		}
		
		$scope.newResource = function(){
			$location.path('/resources/new');
		}
}]);

app.controller('ResourceDetailCtrl', ['$scope', '$routeParams', 'ResourceFactory', '$location',
	function($scope, $routeParams, ResourceFactory, $location){
		$scope.resource = ResourceFactory.show({id: $routeParams.id});
		
		$scope.updateResource = function (){
			ResourceFactory.update($scope.resource);
			$location.path('/resources');
		}
		
		$scope.cancel = function(){
			$location.path('/resources');
		}
	}
]);

app.controller('ResourceCreationCtrl', ['$scope', 'ResourcesFactory', '$location',
	function($scope, ResourcesFactory, $location ){
		//callback for ng-click 'createNewResource'
		$scope.resourceForm = {};
		$scope.resourceForm.name = "NAME";
		$scope.resourceForm.description = "DESCRIPTION";
		$scope.createNewResource = function(){
			console.log($scope.resourceForm)
			ResourcesFactory.create($scope.resourceForm);
			$location.path('/resources');
		}
	}
]);