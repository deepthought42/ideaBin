var app = angular.module('ideaBin.commentControllers', []);

app.controller("CommentIndexController", ['$scope', '$localStorage', 'Comment', '$upload',
	function($scope, $localStorage, Comment, $location) {
		$scope.$storage = $localStorage;
		
		/**
		*	Loads all comments for a given repo. 
		*/
		$scope.$on('loadComments', function(event, path){
			$scope.comments = Comment.query();
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

app.controller('CommentCreationController', ['$scope', 'Comment',
	function($scope, Comment){
		//callback for ng-click 'createNewCommentFactory'
		$scope.comment = {};

		$scope.createComment = function(){
			console.log($scope.comment.message)
			Comment.create({message: $scope.comment.message});
		}
		
	}
]);