var app = angular.module('ideaBin.directoryControllers', []);

app.controller("DirectoryIndexCtrl", ['$scope', 'DirectoryFactory', 'DirectoriesFactory', '$location',
	function($scope, DirectoryFactory, DirectoriesFactory, $location) {
		
		$scope.showDirectories = function(ideaId){
			$scope.directories = DirectoriesFactory.query();
			$location.path('/directories');
		}
		
		$scope.directories = DirectoriesFactory.query();
		
  	$scope.deleteDirectory =  function(directoryId){
			DirectoryFactory.delete({id: directoryId});
			$scope.directories = DirectoriesFactory.query();
		}
		
		$scope.createNewDirectory = function(){
			DirectoriesFactory.create();
			$location.path('/directories');
		};
		
		$scope.editDirectory = function (directoryId) {
			$location.path('/directories/'+directoryId);
		}
		
		$scope.newDirectory = function(){
			$location.path('/directories/new');
		}
}]);

app.controller('DirectoryDetailCtrl', ['$scope', '$routeParams', 'DirectoryFactory', '$location',
	function($scope, $routeParams, DirectoryFactory, $location){
		$scope.directory = DirectoryFactory.show({id: $routeParams.id});
		
		$scope.updateDirectory = function (){
			DirectoryFactory.update($scope.directory);
			$location.path('/directories');
		}
		
		$scope.cancel = function(){
			$location.path('/directories');
		}
	}
]);

app.controller('DirectoryCreationCtrl', ['$scope', 'DirectoriesFactory', '$location',
	function($scope, DirectoriesFactory, $location ){
		//callback for ng-click 'createNewDirectory'
		$scope.directoryForm = {};
		$scope.directoryForm.name = "NAME";
		$scope.directoryForm.description = "DESCRIPTION";
		$scope.createNewDirectory = function(){
			console.log($scope.directoryForm)
			DirectoriesFactory.create($scope.directoryForm);
			$location.path('/directories');
		}
	}
]);