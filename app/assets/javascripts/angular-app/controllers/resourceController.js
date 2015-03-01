var app = angular.module('ideaBin.resourceControllers', []);

app.controller("ResourceIndexCtrl", ['$rootScope', '$scope', '$localStorage', '$rootScope', '$routeParams', 'Resource', '$location', '$upload',
	function($rootScope, $scope, $localStorage, $rootScope, $routeParams, Resource, $location, $upload) {
		$scope.$storage = $localStorage;
		
		//move to event
		$rootScope.$on('loadResources', function(event, directoryId){
			$scope.resources = Resource.query({directory_id: directoryId});
		});
		
		$scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
		
		$scope.showResource = function(resourceText){
			$scope.editor.setValue(resourceText);
		}
		
  	$scope.deleteResource =  function(resourceId){
			Resource.delete({id: resourceId});
			$scope.resources = Resource.query({directory_id: $localStorage.current_directory.id});
		}
		
		$scope.createNewResource = function(){
			Resource.create();
			$location.path('/resources');
		};
		
		$scope.editResource = function (resourceId) {
			$rootScope.$broadcast("editResource", resourceId );
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
									directory_id: $scope.$storage.current_directory.id},
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
					$scope.resources = Resource.query({directory_id: $scope.$storage.current_directory.id});
				});
				//.error(...)
				//.then(success, error, progress); 
				// access or attach event listeners to the underlying XMLHttpRequest.
				//.xhr(function(xhr){xhr.upload.addEventListener(...)})
			}
		};
}]);

app.controller('ResourceDetailCtrl', ['$rootScope', '$scope', '$localStorage', '$routeParams', 'Resource', '$http', '$location',
	function($rootScope, $scope, $localStorage, $routeParams, Resource, $http, $location){
		//$scope.resource = Resource.show({id: $routeParams.id});
		
		$scope.aceLoaded = function(_editor) {
			$scope.editor = _editor;
			// Options
			//_editor.setReadOnly(true);
		};

		$scope.aceChanged = function(e) {
			//
		};
		
		$rootScope.$on('editResource', function(event, resourceId) { 
			$http({method: "GET", url: "/resources/" + resourceId + "/contents"})
				.success(function(data){ 
						$scope.resource = Resource.show({id: resourceId});
						$scope.resource.content = data;
						$scope.editor.setValue(data);
				})
				.error(function(data){
					alert("Failed to load resource!");
				});
		});
		
		$scope.updateResource = function (){
			var content = $scope.editor.getValue();
			$scope.resource.content = content;
			$scope.resource.comment = prompt("Please describe the changes made");
			if($scope.resource.comment){
				Resource.update($scope.resource);
			}
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