var app = angular.module('ideaBin.directoryControllers', ['ngStorage']);

app.controller("DirectoryIndexCtrl", ['$scope', '$rootScope', '$localStorage', '$routeParams', 'Directory', '$location', '$http',
	function($scope, $rootScope, $localStorage, $routeParams, Directory, $location, $http) {
		$rootScope.showCreateDirectoryPanel = false;
		$scope.$storage = $localStorage;
		
  	$scope.deleteDirectory =  function(directory){
			Directory.delete({id: directory.id});
			var index = $scope.directories.indexOf(idea);
			$scope.directories.splice(index, 1);
		}
		
		$scope.newDirectory = function(){
			$location.path('/directories/new');
		}
		
		$scope.$on('addDirectory', function(event, data) { 
			$scope.directories.push(data);
		});
		
		$scope.$on('loadTopDirectory', function(event, path) {
			console.log("REPO :: " + $scope.$storage.repo);
			console.log("REPO PATH :: " + $scope.$storage.repo.path);
			$scope.directories = Directory.query({'path': $localStorage.repo.path})
		});	
}]);

app.controller('DirectoryDetailCtrl', ['$scope', '$routeParams', 'Directory', '$location',
	function($scope, $routeParams, Directory, $location){
		$scope.directory = Directory.show({id: $routeParams.id});
		
		$scope.hideDirectoryPanel = function(event){
			$rootScope.createDirectoryPanelVisible = false;
		}
		
		$scope.updateDirectory = function (){
			Directory.update($scope.directory);
			$location.path('/directories');
		}
		
		$scope.cancel = function(){
			$location.path('/directories');
		}
	}
]);

app.controller('DirectoryCreationCtrl', ['$scope', '$rootScope', '$localStorage', '$routeParams', 'Directory', '$location',
	function($scope, $rootScope, $localStorage, $routeParams, Directory, $location ){
		$scope.$storage = $localStorage;
		//callback for ng-click 'createNewDirectory'
		$scope.directoryForm = {}
		$scope.directoryForm.name = ""
		$scope.createNewDirectory = function(){
			$scope.directoryForm.idea_id = $scope.$storage.current_idea.id;
			$scope.directoryForm.path = $scope.$storage.repo.path;
			$scope.directory = Directory.create($scope.directoryForm);
			console.log("DIRECTORY NAME :: " + $scope.directoryForm.name);
			$rootScope.$broadcast("addDirectory", $scope.directory )
		}
		
		$scope.hideDirectoryEditPanel = function() {
			$rootScope.createDirectoryPanelVisible = false;
		}
	}
]);