var app = angular.module('ideaBin.navigationControllers', []);

app.controller("NavigationController",['$scope', '$location', '$http', '$rootScope', '$localStorage', '$sessionStorage',
	function($scope, $location, $http, $rootScope, $localStorage, $sessionStorage) {
		$scope.$session = $sessionStorage;
		$scope.showMyIdeas = function(){
			$rootScope.$broadcast('showMyIdeas', $scope.$session.user.id);
			$location.path('/ideaIdx')
		}

		$scope.showNewIdea = function(){
			$rootScope.$broadcast('showAddIdea');
		}

		$scope.showAllIdeas = function(){
			$rootScope.$broadcast('showAllIdeas');
			$location.path('/ideaIdx')
		}

		$scope.showContactUs = function(){
			$location.path('/contact_us');
		};
	}]);
