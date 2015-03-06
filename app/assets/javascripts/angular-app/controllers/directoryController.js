var app = angular.module('ideaBin.directoryControllers', ['ngStorage']);

app.controller("DirectoryIndexCtrl", ['$scope', '$rootScope', '$localStorage', '$routeParams', 'Directory', '$location', '$http',
	function($scope, $rootScope, $localStorage, $routeParams, Directory, $location, $http) {
		$rootScope.showCreateDirectoryPanel = false;
		$scope.$storage = $localStorage;
		var curr_idea = $scope.$storage.current_idea;
		
		$scope.showDirectories = function(dir_id){
			$scope.current_directory = Directory.show({id: dir_id}).$promise;
			$scope.current_directory.then(function onSuccess(response) {
				// access data from 'response'
				$scope.$storage.current_directory = response;
				$scope.directories = Directory.query({parent_id: response.id});
				$rootScope.$broadcast('loadResources', response.id);
			},
			function onFail(response) {
					// handle failure
			});
		}		
	
		$scope.hideCreateDirectoryPanel = function(){
				//$rootScope.
		}
		
		$scope.showCreatePanel = function(){
			$rootScope.createDirectoryPanelVisible = true;
		};
		
  	$scope.deleteDirectory =  function(directoryId){
			Directory.delete({id: directoryId});
			$scope.directories = Directory.query();
		}
		
		$scope.newDirectory = function(){
			$location.path('/directories/new');
		}
		
		$rootScope.$on('addDirectory', function(event, data) { 
			$scope.directories.push(data);
		});
		
		$rootScope.$on('loadTopDirectory', function(event, ideaId) { 
			$http({method: "GET", url: "/directories/" + $scope.$storage.current_idea.id + "/topDir.json"})
					.success(function(data){ 
							console.log("DATA :: " + data);
							$scope.$storage.current_directory = data;
							$scope.showDirectories($scope.$storage.current_directory.id);
							$rootScope.$broadcast('loadResources', $scope.$storage.current_directory.id);
					})
					.error(function(data){
						alert("Failed to load Directory!");
					});
		});	
	
		$rootScope.$on('showNewDirectoryPanel', function(event){
            $rootScope.showCreateDirectoryPanel = true;
			$('#directoryForm').slideToggle().delay(100);
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
		$scope.directoryForm.name = "NAME"
		$scope.createNewDirectory = function(){
			$scope.directoryForm.idea_id = $scope.$storage.current_idea;
			if($scope.$storage.current_directory){
				$scope.directoryForm.parent_id = $scope.$storage.current_directory.id;
			}
			console.log($scope.directoryForm)
			$scope.directory = Directory.create($scope.directoryForm);
			$rootScope.$broadcast("addDirectory", $scope.directory )
		}
		
		$scope.hideDirectoryEditPanel = function() {
			$rootScope.createDirectoryPanelVisible = false;
		}
	}
]);