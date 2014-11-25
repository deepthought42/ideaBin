var app = angular.module('ideaBin.directoryControllers', []);

app.controller("DirectoryIndexCtrl", ['$scope', '$rootScope', '$routeParams', 'Directory', '$location',
	function($scope, $rootScope, $routeParams, Directory, $location) {
		$scope.directories = Directory.query({idea_id: $routeParams.id});
		$rootScope.showCreateDirectoryPanel = false;
		
		$scope.showDirectories = function(ideaId){
			$scope.directories = Directory.query();
			$location.path('/directories');
		}
		
				
		$scope.showCreatePanel = function(){
			$rootScope.showCreateDirectoryPanel = true;
		};
		
  	$scope.deleteDirectory =  function(directoryId){
			Directory.delete({id: directoryId});
			$scope.directories = Directory.query();
		}
		
		$scope.createNewDirectory = function(){
			Directory.create();
			$location.path('/directories');
		};
		
		$scope.editDirectory = function (directoryId) {
			$location.path('/directories/'+directoryId);
		}
		
		$scope.newDirectory = function(){
			$location.path('/directories/new');
		}
}]);

app.controller('DirectoryDetailCtrl', ['$scope', '$routeParams', 'Directory', '$location',
	function($scope, $routeParams, Directory, $location){
		$scope.directory = Directory.show({id: $routeParams.id});
		
		$scope.updateDirectory = function (){
			Directory.update($scope.directory);
			$location.path('/directories');
		}
		
		$scope.cancel = function(){
			$location.path('/directories');
		}
	}
]);

app.controller('DirectoryCreationCtrl', ['$scope', 'Directory', '$location',
	function($scope, Directory, $location ){
		//callback for ng-click 'createNewDirectory'
		$scope.directoryForm = {};
		$scope.directoryForm.name = "NAME";
		$scope.directoryForm.description = "DESCRIPTION";
		$scope.createNewDirectory = function(){
			console.log($scope.directoryForm)
			Directory.create($scope.directoryForm);
			$location.path('/directories');
		}
	}
]);