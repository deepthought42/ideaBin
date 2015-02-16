var app = angular.module('ideaBin.directoryControllers', ['ngStorage']);

app.controller("DirectoryIndexCtrl", ['$scope', '$rootScope', '$localStorage', '$routeParams', 'Directory', 'DirectoryEvent', '$location',
	function($scope, $rootScope, $localStorage, $routeParams, Directory, DirectoryEvent, $location) {
	
		$scope.showDirectories = function(dir_id){
			$scope.current_directory = Directory.show({id: dir_id}).$promise;
			
			$scope.current_directory.then(function onSuccess(response) {
				// access data from 'response'
				console.log("Succesful showing of directory");
				$scope.$storage.current_directory = response;
				$scope.directories = Directory.query({parent_id: $scope.$storage.current_directory.id});
			},
			function onFail(response) {
					// handle failure
			});

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
			$scope.directories = Directory.query({parent_id: $scope.$storage.current_directory.id});
		});
		

		$rootScope.showCreateDirectoryPanel = false;
		$scope.$storage = $localStorage;
		var curr_idea = $scope.$storage.current_idea;
		console.log("IDEA TO JSON :: " + curr_idea);
		
		if($scope.$storage.current_directory && $scope.$storage.current_directory.length > 0){
			$scope.showDirectories($scope.$storage.current_directory);
		}
		else{			
			$scope.current_directory = Directory.show({id: $scope.$storage.current_idea}).$promise;
			//var dir = 173;
			$scope.current_directory.then(function onSuccess(response) {
				// access data from 'response'
				$scope.$storage.current_directory = response;
				$scope.directories = Directory.query({parent_id: $scope.$storage.current_directory.id});
			},
			function onFail(response) {
					// handle failure
			});

			
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
		$scope.directoryForm = {}
		$scope.directoryForm.name = "NAME"
		$scope.createNewDirectory = function(){
			$scope.directoryForm.idea_id = $scope.$storage.current_idea.id
			if($scope.$storage.current_directory){
				$scope.directoryForm.parent_id = $scope.$storage.current_directory.id
			}
			console.log($scope.directoryForm)
			Directory.create($scope.directoryForm);
			//fire event to add directory to directories list
			DirectoryEvent.broadcastNewDirectory($rootScope);
			//$location.path('/directories');
		}
	}
]);