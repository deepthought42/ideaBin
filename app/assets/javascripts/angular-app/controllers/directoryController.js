var app = angular.module('ideaBin.directoryControllers', [
	'ngStorage']);

app.controller("DirectoryIndexCtrl", ['$scope', '$rootScope', '$localStorage', '$routeParams', 'Directory', 'DirectoryEvent', '$location',
	function($scope, $rootScope, $localStorage, $routeParams, Directory, DirectoryEvent, $location) {
	
		$scope.showDirectories = function(dir_id){
			$scope.$storage.current_directory = Directory.query({id: dir_id});
			var directories = Directory.query({parent_id: dir_id});
			if(directories){
				$scope.directories = directories;
			}
			else{
				$scope.directories = {};
			}
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
		
		//EVENT HANDLING
		$rootScope.$on('directoryCreated', function(event, data){
			$scope.directories = Directory.query({idea_id: $scope.$storage.current_idea.id});
		});
		

		$rootScope.showCreateDirectoryPanel = false;
		$scope.$storage = $localStorage;
		if($scope.$storage.current_directory){
			$scope.showDirectories($scope.$storage.current_directory);
		}
		else{
			$scope.directories = Directory.query({idea_id: $routeParams.id});
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

app.controller('DirectoryCreationCtrl', ['$scope', '$rootScope', '$localStorage', '$routeParams', 'DirectoryEvent', 'Directory', '$location',
	function($scope, $rootScope, $localStorage, $routeParams, DirectoryEvent, Directory, $location ){
		$scope.$storage = $localStorage;
		//callback for ng-click 'createNewDirectory'
		console.log("CREATE DIRECTORY CONTRLLER");
		$scope.directoryForm = {};
		$scope.directoryForm.name = "NAME";
		$scope.createNewDirectory = function(){
			$scope.directoryForm.idea_id = $scope.$storage.current_idea.id;

			console.log($scope.directoryForm)
			Directory.create($scope.directoryForm);
			//fire event to add directory to directories list
			DirectoryEvent.broadcastNewDirectory($rootScope);
			//$location.path('/directories');
		}
	}
]);