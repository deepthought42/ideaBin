var app = angular.module('ideaBin.directoryControllers', ['ngStorage']);

app.controller("DirectoryIndexCtrl", ['$scope', '$rootScope', '$localStorage', '$routeParams', 'Directory', '$location', '$http',
	function($scope, $rootScope, $localStorage, $routeParams, Directory, $location, $http) {
		$rootScope.showCreateDirectoryPanel = false;
		$scope.$storage = $localStorage;
		$scope.$storage.dir_path = "/";
		
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
		
		$scope.loadDirectory = function(name, path){
			$scope.directories = Directory.query({'path': path+"/"+name})
			$scope.$storage.dir_path = "/"+name;
		}
		
		$scope.$on('loadDirectory', function(event, path) {
			console.log("REPO :: " + $scope.$storage.repo);
			console.log("REPO PATH :: " + $scope.$storage.repo.path);
			$scope.loadDirectory("", path)
		});	
}]);

app.controller('DirectoryCreationCtrl', ['$scope', '$rootScope', '$localStorage', '$routeParams', 'Directory', '$location',
	function($scope, $rootScope, $localStorage, $routeParams, Directory, $location ){
		$scope.$storage = $localStorage;
		//callback for ng-click 'createNewDirectory'
		$scope.directoryForm = {}
		$scope.directoryForm.name = ""
		$scope.createNewDirectory = function(){
			$scope.directoryForm.idea_id = $scope.$storage.current_idea.id;
			$scope.directoryForm.path = $localStorage.repo.path + $localStorage.dir_path;
			$scope.directory = Directory.create($scope.directoryForm);
			console.log("DIRECTORY NAME :: " + $scope.directoryForm.name);
			$rootScope.$broadcast("addDirectory", $scope.directory )
		}
		
		$scope.hideDirectoryEditPanel = function() {
			$rootScope.createDirectoryPanelVisible = false;
		}
	}
]);