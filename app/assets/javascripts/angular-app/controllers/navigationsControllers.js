var app = angular.module('ideaBin.navigationControllers', []);

app.controller("NavigationController",['$scope', '$location', '$http', '$rootScope', '$localStorage',
	function($scope, $location, $http, $rootScope, $localStorage) {
		$scope.showMyIdeas = function(){
			$rootScope.$broadcast('showMyIdeas', $localStorage.user.id);
			$location.path('/ideas')
		}
		
		$scope.showNewIdea = function(){
			$rootScope.$broadcast('showAddIdea');
		}
		
		$scope.showAllIdeas = function(){
			$rootScope.$broadcast('showAllIdeas');
			$location.path('/ideas')
		}
				
		$scope.showContactUs = function(){
			$location.path('/contact_us');
		};
	}]);