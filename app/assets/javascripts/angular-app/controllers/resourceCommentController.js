var app = angular.module('ideaBin.resourceCommentControllers', ['ngResource']);

app.controller("ResourceCommentIndexController", ['$scope', '$localStorage', '$sessionStorage', 'ResourceComment', 'User', '$http',
	function($scope, $localStorage, $sessionStorage, ResourceComment, User, $http) {
		$scope.$storage = $localStorage;
		$scope.resourceComments = [];
		$scope.mouseOverAvatars = false;
		$scope.$session = $sessionStorage;

		$scope.avatarMouseOver = function() {
			$scope.mouseOverAvatars = true;
		}
		
		$scope.avatarMouseOut = function(){
			$scope.mouseOverAvatars = false;
		}
		
		/**
		*	Loads all comments for a given repo. 
		*/
		$scope.$on('loadResourceComments', function(event, name){
			ResourceComment.query({path: $localStorage.repo.path + $localStorage.dir_path + name}).$promise
				.then(function(response){
						$scope.resourceComments = response;
						var users = [];
						for(var key in $scope.resourceComments){
							if(typeof $scope.resourceComments[key].id != 'undefined' && 
							   users.indexOf($scope.resourceComments[key].user_id) == -1){
								users.push($scope.resourceComments[key].user_id)
							}
						}
						
						$http.get('/users.json',
						{ params: {
								user_ids: JSON.stringify(users) // ids is [1, 2, 3, 4]
						}}
						)
					 },function(response){
								alert("there was a problem loading users for resources");
					 });
			
		});
		
		/**
		* Adds a comment to the current index of resource comments
		*/
		$scope.$on('addResourceCommentToIndex', function(event, comment){
			console.log("COMMENT :: " + comment);
			$scope.resourceComments.push(comment);
		});
		
		/**
		*	Deletes a comment with a given comment id.
		*/
  	$scope.deleteResourceComment =  function(resource_comment_id){
			$localStorage.repo.path + $localStorage.dir_path + commentName;
			ResourceComment.delete({id: resource_comment_id});
			
			var index = $scope.resourceComments.indexOf(resource_comment_id);
			$scope.resourceComments.splice(index, 1);
		}

		/**
		* 
		*/
		$scope.editResourceComment = function (comment){
			comment.isEditResourceVisible = true;
			$scope.$broadcast('editResourceComment', comment);
		}
}]);

app.controller('ResourceCommentDetailController', ['$scope', '$localStorage', 'ResourceComment',
	function($scope, $localStorage, ResourceComment){
		$scope.resource_comment = {};
		$scope.$on('editResourceComment', function(event, comment){
			$scope.resource_comment = comment;
		});

		$scope.updateResourceComment = function(){
			ResourceComment.update($scope.resource_comment);
			$scope.resource_comment.isEditResourceVisible = false;
		}
	}
]);

app.controller('ResourceCommentCreationController', ['$scope', '$localStorage', '$rootScope', 'ResourceComment',
  function($scope, $localStorage, $rootScope, ResourceComment){
		$scope.resource_comment = {}
    $scope.createResourceComment = function(){
      if($localStorage.resource){
				var resourceComment = ResourceComment.create(
					{
					 	path: $localStorage.repo.path + $localStorage.dir_path + $localStorage.resource, 
					 	repo_id: $localStorage.repo.id, 
					 	comment: $scope.resource_comment.comment
			    }
				).$promise;

				resourceComment.then(function onSuccess(response){
					console.log("RESPONSER :: " + response + ", :: " + response.comment);
					$rootScope.$broadcast('addResourceCommentToIndex', response);
					$scope.resource_comment.comment = '';
				})
      }
      else{
				alert("No resource is loaded, so there is nothing to comment on");
      }
    }
  }
]);
