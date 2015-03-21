var app = angular.module('ideaBin.repositoryControllers', []);

app.controller("RepositoryIndexController", ['$scope', '$localStorage', 'Repository', '$location', '$http', '$rootScope',
	function($scope, $localStorage, Repository, $location, $http, $rootScope) {
		$scope.$storage = $localStorage;
		
		$scope.createNewRepository = function(){
			Repository.create();
			$location.path('/repositories');
		};
		
		$scope.$on('showMyRepositories', function(event, userId){
			$scope.showUserRepositories(userId);
		});
		
		$scope.$on('showAllIdeaRepositories', function(event, data){
			$scope.repositories = Repository.query();
		});
		
		$scope.showUserRepositorys = function(userId){
			$http.get("/userRepositories/" + userId+".json")
				.success(function(data){ 
					$scope.repositories = data;
				})
				.error(function(data){
					alert(data.errors);
				});
		}
}]);