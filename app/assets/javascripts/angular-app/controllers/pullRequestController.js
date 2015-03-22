var app = angular.module('ideaBin.pullRequestControllers', []);

app.controller("PullRequestIndexController", ['$scope', '$localStorage', 'PullRequest', '$location', '$http', '$rootScope',
	function($scope, $localStorage, PullRequest, $location, $http, $rootScope) {
		$scope.$storage = $localStorage;
		$scope.pullRequests = PullRequest.query({repo_id: $localStorage.repo.id});
		
  	$scope.rejectPullRequest =  function(pullRequest){
			PullRequest.delete({id: pullRequest.id});
			var index = $scope.pullRequests.indexOf(pullRequest);
			$scope.pullRequests.splice(index, 1);
		}
		
		$scope.createNewPullRequest = function(){
			PullRequest.create();
			$location.path('/pullRequests');
		}
		
		$scope.showPullRequest = function(pullRequestId){
			$rootScope.$broadcast('showPullRequest', pullRequestId);
		}
		
		$scope.acceptPullRequest = function (pullRequestId) {
			PullRequest.update({id: pullRequestId});
			$location.path('/ideas/'+$localStorage.current_idea.id);
		}
		
		$scope.showNewPullRequest = function(){
			$scope.isCreatePullRequestPanelVisible = true;
		}
	
		$scope.$on('showMyPullRequests', function(event, userId){
			$scope.showUserPullRequests(userId);
		});
		
		$scope.$on('showAddPullRequest', function(event, data){
			$scope.showNewPullRequest();
		});
		
		$scope.$on('showAllPullRequests', function(event, data){
			$scope.pullRequests = PullRequest.query();
		});
		
		$scope.$on('addPullRequestToList', function(event, data){
			$scope.pullRequests.push(data);
		});
		
		$scope.showUserPullRequests = function(userId){
			$http.get("/userPullRequests/" + userId+".json")
				.success(function(data){ 
					$scope.pullRequests = data;
				})
				.error(function(data){
					alert(data.errors);
				});
		}
		
		$scope.$on('hideCreatePullRequestPanel', function(event, data) {
			$scope.isCreatePullRequestPanelVisible = false;
		});
}]);

app.controller('PullRequestDetailController', ['$scope', '$localStorage', '$routeParams', 'PullRequest', '$location', '$upload', '$rootScope',
	function($scope, $localStorage, $routeParams, PullRequest, $location, $upload, $rootScope){
		$scope.$storage = $localStorage;

		$scope.updatePullRequest = function (pullRequestId){
			PullRequest.update($scope.pullRequest,{id: pullRequestId}, function(){
					
			});
		}
		
		$scope.hidePullRequestDetailPanel = function() {
			//$rootScope.pullRequestEditPanelVisible = false;
		}
		
		$scope.$on('showPullRequest', function(event, pullRequestId){
			console.log("PULL REQUEST ID :: " + pullRequestId);
			$scope.pull_request = PullRequest.show({id: pullRequestId});
			$("#pullRequestDetailsPanel").show();
		})
	}
]);

app.controller('PullRequestCreationController', ['$scope', '$rootScope', 'PullRequest', '$location', '$upload','$localStorage',
	function($scope, $rootScope, PullRequest, $location, $upload, $localStorage ){
		//callback for ng-click 'createNewPullRequest'
		$scope.pullRequestForm = {};
		
		
		$scope.createNewPullRequest = function(){
			$scope.pullRequestForm.idea_id = $localStorage.current_idea.id;
			PullRequest.create($scope.pullRequestForm, function(){
				});
		}
		
		$scope.$on('showPullRequestCreatePanel', function() {
			$("#pullRequestCreatePanel").show();
		})
		
		$scope.hideCreatePullRequestPanel = function(){
			$("#pullRequestCreatePanel").hide();
		}
	}
]);