var app = angular.module('ideaBin.repositoryCommentControllers', []);

app.controller("RepositoryCommentIndexController", ['$scope', '$localStorage', 'RepositoryComment', 'User',
	function($scope, $localStorage, RepositoryComment, User) {
		$scope.$storage = $localStorage;
		
		/**
		*	Loads all comments for a given repo. 
		*/
		$scope.$on('loadRepositoryComments', function(event, data){
			$scope.repositoryComments = RepositoryComment.query({repo_id: $localStorage.repo.id});
			$scope.users = [];

			for(var i = 0; i < $scope.repositoryComments.length; i++){
				if($scope.users.indexOf($scope.repositoryComments[i].id)){
					$scope.users.push($scope.repositoryComments[i].id)
				}
			}
			$scope.commentUsers = User.query({user_ids: $scope.users})
		});
		
		/**
		* Adds a comment to the current index of repository comments
		*/
		$scope.$on('addRepositoryCommentToIndex', function(event, comment){
			$scope.repositoryComments.push(comment);
		});
		
		/**
		*	Deletes a comment with a given comment id.
		*/
  	$scope.deleteRepositoryComment =  function(repository_comment_id){
			$localStorage.repo.path + $localStorage.dir_path + commentName;
			RepositoryComment.delete({id: repository_comment_id});
			
			var index = $scope.repositoryComments.indexOf(repository_comment_id);
			$scope.repositoryComments.splice(index, 1);
		}
}]);

app.controller('RepositoryCommentDetailController', ['$scope', '$localStorage', 'RepositoryComment',
	function($scope, $localStorage, RepositoryComment){
		$scope.updateComment = function (message){
			$scope.repositoryComment.comment = message;
			if($scope.repositoryComment){
				RepositoryComment.update($scope.repositoryComment);
			}
		}
	}
]);

app.controller('RepositoryCommentCreationController', ['$scope', '$localStorage', '$rootScope', 'RepositoryComment',
	function($scope, $localStorage, $rootScope, RepositoryComment){
		$scope.repositoryComment = {};

		$scope.createComment = function(){
			var repositoryComment = RepositoryComment.create({message: $scope.repository_comment.message, repo_id: $localStorage.repo.id});
			$rootScope.$broadcast('addRepositoryCommentToIndex', repositoryComment);
		}
		
	}
]);