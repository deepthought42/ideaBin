var app = angular.module('ideaBin.directoryControllers', ['ngStorage']);

app.controller("DirectoryIndexCtrl", ['$scope', '$rootScope', '$localStorage', '$routeParams', 'Directory', '$location', '$http',
	function($scope, $rootScope, $localStorage, $routeParams, Directory, $location, $http) {
		$rootScope.showCreateDirectoryPanel = false;
		$scope.$storage = $localStorage;

		$scope.loadParentDirectory = function(){
			var idx = $scope.$storage.dir_path.lastIndexOf("/");
			var parent_dir_path = $scope.$storage.dir_path.substring(0, idx);
			console.log("current DIR :: " + $scope.$storage.dir_path);
			console.log("PARENT DIR :: " + parent_dir_path);
			$scope.loadDirectory("", $scope.$storage.repo.path + parent_dir_path);
		}
		
  	$scope.deleteDirectory =  function(directory){
			Directory.delete({id: 1, path: $localStorage.repo.path + $localStorage.dir_path + directory });
			var index = $scope.directories.indexOf(directory);
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
			if(typeof name != 'undefined' && name != null && name != ''){
				if($scope.$storage.dir_path.lastIndexOf("/") === $scope.$storage.dir_path.length-1){
					$scope.$storage.dir_path += name;
				}
				else{
					$scope.$storage.dir_path +=  name + "/";
				}
			}
			else{
				$scope.$storage.dir_path =  "/";
			}
			$rootScope.$broadcast('loadResources', $scope.$storage.repo.path + $scope.$storage.dir_path);
		}
		
		$scope.$on('loadDirectory', function(event, path) {
			$scope.loadDirectory("", path)
		});	
}]);

app.controller('DirectoryCreationCtrl', ['$scope', '$rootScope', '$localStorage', '$sessionStorage', '$routeParams', 'Directory', '$location',
	function($scope, $rootScope, $localStorage, $sessionStorage, $routeParams, Directory, $location ){
		$scope.$storage = $localStorage;
		$scope.$session = $sessionStorage
		//callback for ng-click 'createNewDirectory'
		$scope.directoryForm = {}
		$scope.directoryForm.name = ""
		$scope.createNewDirectory = function(){
			$scope.directoryForm.idea_id = $scope.$storage.current_idea.id;
			$scope.directoryForm.path = $localStorage.repo.path + $localStorage.dir_path;
			$scope.directory = Directory.create($scope.directoryForm);
			console.log("DIRECTORY NAME :: " + $scope.directoryForm.name);
			$rootScope.$broadcast("addDirectory", $scope.directoryForm.name )
		}
		
		$scope.hideDirectoryEditPanel = function() {
			$rootScope.createDirectoryPanelVisible = false;
		}
	}
]);
