var app = angular.module('ideaBin.navigationControllers', []);

app.controller("NavigationController",['$scope', '$http', '$rootScope', '$localStorage',
	function($scope, $http, $rootScope, $localStorage) {
		$scope.showMyIdeas = function(){
			$rootScope.$broadcast('showMyIdeas', $localStorage.user.id);
		}
		
		$scope.showNewIdea = function(){
			
		}
	}]);