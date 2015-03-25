var app = angular.module('ideaBin.commentControllers', []);

app.controller("CommentIndexController", ['$rootScope', '$scope', '$localStorage', '$rootScope', '$routeParams', 'Comment', '$location', '$upload', '$http',
	function($rootScope, $scope, $localStorage, $rootScope, $routeParams, Comment, $location, $upload, $http) {
		$scope.$storage = $localStorage;
		
		/**
		*	Loads all comments for a given repo. 
		*/
		$scope.$on('loadComments', function(event, path){
			$scope.comments = Comment.query({idea_id: $localStorage.repo.id});
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
		
		$scope.editComment = function (comment_name) {
			$rootScope.$broadcast("editComment", comment_name );
		}
}]);

app.controller('CommentDetailController', ['$rootScope', '$scope', '$localStorage', '$routeParams', 'Comment', '$http', '$location',
	function($rootScope, $scope, $localStorage, $routeParams, Comment, $http, $location){
		$scope.updateComment = function (message){
			$scope.comment.comment = message;
			if($scope.comment.comment){
				Comment.update($scope.comment);
			}
		}
	}
]);

app.controller('CommentCreationController', ['$scope', 'Comment', '$location',
	function($scope, Comment, $location ){
		//callback for ng-click 'createNewCommentFactory'
		$scope.comment = {};

		$scope.createComment = function(){
			console.log($scope.comment.message)
			Comment.create($scope.comment);
		}
		
	}
]);