var app = angular.module('ideaBin.resourceControllers', []);

app.controller("ResourceIndexCtrl", ['$rootScope', '$scope', '$localStorage', '$rootScope', '$routeParams', 'Resource', '$location', '$upload', '$http',
	function($rootScope, $scope, $localStorage, $rootScope, $routeParams, Resource, $location, $upload, $http) {
		$scope.$storage = $localStorage;
		
		//move to event
		$scope.$on('loadResources', function(event, path){
			$scope.resources = Resource.query({path: path});
		});
		
		$scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
		
		$scope.showResource = function(resourceText){
			$scope.editor.setValue(resourceText);
		}
		
  	$scope.deleteResource =  function(resourceName){
			$localStorage.repo.path + $localStorage.dir_path + resourceName;
			Resource.delete({id: $localStorage.repo.id, path: resourceName});
			
			var index = $scope.resources.indexOf(resourceName);
			$scope.resources.splice(index, 1);
		}
		
		$scope.createNewResource = function(){
			Resource.create();
			$location.path('/resources');
		};
		
		$scope.editResource = function (resource_name) {
			$rootScope.$broadcast("editResource", resource_name );
		}
		
		$scope.downloadResource = function(path, filename){
			$http.get('/resources/1/download', {params: {path: path+filename}}).
				success(function(data, status, headers, config) {
					 var element = angular.element('<a/>');
					 element.attr({
							 href: 'data:attachment/*;' + encodeURI(data),
							 target: '_blank',
							 download: filename
					 })[0].click();
				}).
				error(function(data, status, headers, config) {
					alert("Error downloading file");
				});
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
									repo_id:	$localStorage.repo.id},
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
					$scope.resources = Resource.query({path: $localStorage.repo.path + $scope.$storage.dir_path});
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
			//TODO : Save changes
		};
		
		$scope.$on('editResource', function(event, resource_name) { 
			console.log("FILENAME :: " + resource_name);
			$http.get("/resources/1/contents", {params: {filename: resource_name, path: $localStorage.repo.path + $localStorage.dir_path}})
				.success(function(data){ 
						$scope.resource = {};
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
		$scope.resourceForm.name = "";
		$scope.resourceForm.description = "";
		$scope.createNewResource = function(){
			console.log($scope.resourceForm)
			Resource.create($scope.resourceForm);
			$location.path('/resources');
		}
	}
]);