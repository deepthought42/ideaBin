var app = angular.module('ideaBin.resourceControllers', []);

app.controller("ResourceIndexCtrl", ['$scope', '$localStorage', '$rootScope', '$routeParams', 'Resource', '$location', '$upload',
	function($scope, $localStorage, $rootScope, $routeParams, Resource, $location, $upload) {
		$scope.$storage = $localStorage;
		$scope.resources = Resource.query({parent_id: $localStorage.current_directory});
		
		$scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
		
		$scope.showResource = function(resourceId){
		}
		
  	$scope.deleteResource =  function(resourceId){
			Resource.delete({id: resourceId});
			$scope.resources = Resource.query({parent_id: $localStorage.current_directory});
		}
		
		$scope.createNewResource = function(){
			Resource.create();
			$location.path('/resources');
		};
		
		$scope.editResource = function (resourceId) {
			$location.path('/resources/'+resourceId);
		}
		
		$scope.upload = function(files) {			
			
			for (var i = 0; i < files.length; i++) {
				var comment = prompt("Please describe the upload");
				var file = files[i];
				
				$upload.upload({
					url: '/resources.json', 
					method: 'POST', // or 'PUT',
					headers: {'XSRF-TOKEN': ''},
					//withCredentials: true,
					data: {	comment: comment, 
									resource: $scope.resource, 
									idea_id: $scope.$storage.current_idea, 
									directory_id: $scope.$storage.current_directory},
					file: file, // or list of files ($files) for html5 only
					//fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
					// customize file formData name ('Content-Disposition'), server side file variable name. 
					//fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
					// customize how data is added to formData. See #40#issuecomment-28612000 for sample code
					//formDataAppender: function(formData, key, val){}
				}).progress(function(evt) {
					console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
				}).success(function(data, status, headers, config) {
					// file is uploaded successfully
					console.log("UPLOAD SUCCESSFUL");
					$scope.resources = Resource.query({parent_id: $scope.$storage.current_directory});
				});
				//.error(...)
				//.then(success, error, progress); 
				// access or attach event listeners to the underlying XMLHttpRequest.
				//.xhr(function(xhr){xhr.upload.addEventListener(...)})
			}
		};
}]);

app.controller('ResourceDetailCtrl', ['$scope', '$routeParams', 'Resource', '$location',
	function($scope, $routeParams, Resource, $location){
		$scope.resource = Resource.show({id: $routeParams.id});
		
		$scope.updateResource = function (){
			Resource.update($scope.resource);
			$location.path('/resources');
		}

		$scope.cancel = function(){
			$location.path('/resources');
		}
	}
]);

app.controller('ResourceCreationCtrl', ['$scope', 'Resource', '$location',
	function($scope, Resource, $location ){
		//callback for ng-click 'createNewResourceFactory'
		$scope.resourceForm = {};
		$scope.resourceForm.name = "NAME";
		$scope.resourceForm.description = "DESCRIPTION";
		$scope.createNewResource = function(){
			console.log($scope.resourceForm)
			Resource.create($scope.resourceForm);
			$location.path('/resources');
		}
	}
]);