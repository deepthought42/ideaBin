var app = angular.module('ideaBin.commentControllers', []);

app.controller("CommentIndexController", ['$scope', '$localStorage', 'Comment', '$upload',
	function($scope, $localStorage, Comment, $location) {
		$scope.$storage = $localStorage;
		
		/**
		*	Loads all comments for a given repo. 
		*/
		$scope.$on('loadComments', function(event, data){
			$scope.comments = Comment.query();
		});
		
		/**
		* Adds a comment to the current index of comments
		*/
		$scope.$on('addCommentToIndex', function(event, comment){
			$scope.comments.push(comment);
		});
		
		/**
		*	Deletes a comment with a given comment id.
		*/
  	$scope.deleteComment =  function(comment_id){
			$localStorage.repo.path + $localStorage.dir_path + commentName;
			Comment.delete({id: comment_id});
			
			var index = $scope.comments.indexOf(comment_id);
			$scope.comments.splice(index, 1);
		}
}]);

app.controller('CommentDetailController', ['$scope', '$localStorage', 'Comment',
	function($scope, $localStorage, Comment){
		$scope.updateComment = function (message){
			$scope.comment.comment = message;
			if($scope.comment.comment){
				Comment.update($scope.comment);
			}
		}
	}
]);

app.controller('CommentCreationController', ['$scope', '$rootScope', 'Comment',
	function($scope, $rootScope, Comment){
		//callback for ng-click 'createNewCommentFactory'
		$scope.comment = {};

		$scope.createComment = function(){
			var comment = Comment.create({message: $scope.comment.message});
			$rootScope.$broadcast('addCommentToIndex', comment);
		}
		
	}
]);