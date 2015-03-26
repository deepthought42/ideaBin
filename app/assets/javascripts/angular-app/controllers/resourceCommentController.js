var app = angular.module('ideaBin.resourceCommentControllers', []);

app.controller("ResourceCommentIndexController", ['$scope', '$localStorage', 'ResourceComment', '$upload',
	function($scope, $localStorage, ResourceComment, $location) {
		$scope.$storage = $localStorage;
		$scope.resourceComment = {};

		/**
		*	Loads all comments for a given repo. 
		*/
		$scope.$on('loadResourceComments', function(event, data){
			$scope.resourceComments = ResourceComment.query({path: $localStorage.repo.path + $localStorage.dir_path + $localStorage.resource});
		});
		
		/**
		* Adds a comment to the current index of resource comments
		*/
		$scope.$on('addResourceCommentToIndex', function(event, comment){
			console.log("comment :: " + comment);
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
}]);

app.controller('ResourceCommentDetailController', ['$scope', '$localStorage', 'ResourceComment',
	function($scope, $localStorage, ResourceComment){
		$scope.updateComment = function (message){
			$scope.resourceComment.comment = message;
			if($scope.resourceComment){
				ResourceComment.update($scope.resourceComment);
			}
		}
	}
]);

app.controller('ResourceCommentCreationController', ['$scope', '$localStorage', '$rootScope', 'ResourceComment',
	function($scope, $localStorage, $rootScope, ResourceComment){
		$scope.createResourceComment = function(){
			if($localStorage.resource){
				var resourceComment = ResourceComment.create({path: $localStorage.repo.path + $localStorage.dir_path + $localStorage.resource, repo_id: $localStorage.repo.id, message: $scope.resource_comment.message});
				$rootScope.$broadcast('addResourceCommentToIndex', resourceComment);
			}
			else{
				alert("Pssst. No resource is loaded, so there is nothing to comment on");
			}
		}
		
	}
]);