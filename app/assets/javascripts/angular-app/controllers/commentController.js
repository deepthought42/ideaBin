var app = angular.module('ideaBin.commentControllers', []);

app.controller("CommentIndexController", ['$rootScope', '$scope', '$localStorage', '$rootScope', '$routeParams', 'Comment', '$location', '$upload', '$http',
	function($rootScope, $scope, $localStorage, $rootScope, $routeParams, Comment, $location, $upload, $http) {
		$scope.$storage = $localStorage;
		
		$scope.$on('loadComments', function(event, path){
			$scope.comments = Comment.query();
		});
		
  	$scope.deleteComment =  function(comment_id){
			$localStorage.repo.path + $localStorage.dir_path + commentName;
			Comment.delete({id: comment_id});
			
			var index = $scope.comments.indexOf(comment_id);
			$scope.comments.splice(index, 1);
		}
		
		$scope.createNewComment = function(){
			Comment.create();
			$location.path('/comments');
		};
		
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
		$scope.commentForm = {};
		$scope.commentForm.name = "";
		$scope.commentForm.description = "";
		$scope.createNewComment = function(){
			console.log($scope.commentForm)
			Comment.create($scope.commentForm);
			$location.path('/comments');
		}
	}
]);