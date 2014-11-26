var app = angular.module('ideaBin.resourceControllers', []);

app.controller("ResourceIndexCtrl", ['$scope', '$routeParams', 'ResourceFactory', '$location', 'FileUploader',
	function($scope, $routeParams, ResourceFactory, $location, FileUploader) {
		$scope.resources = ResourceFactory.query({idea_id: $routeParams.id});
		
		$scope.showResourceFactorys = function(ideaId){
			$scope.resources = ResourceFactory.query();
			$location.path('/resources');
		}
		
  	$scope.deleteResourceFactory =  function(resourceId){
			ResourceFactoryFactory.delete({id: resourceId});
			$scope.resources = ResourceFactory.query();
		}
		
		$scope.createNewResourceFactory = function(){
			ResourceFactory.create();
			$location.path('/resources');
		};
		
		$scope.editResourceFactory = function (resourceId) {
			$location.path('/resources/'+resourceId);
		}
		
		$scope.newResourceFactory = function(){
			$location.path('/resources/new');
		}
		
		$scope.uploader = new FileUploader({url:"/resources"});
		
		$scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      $scope.upload = $upload.upload({
        url: '/resources', 
        method: 'POST', // or 'PUT',
        //headers: {'header-key': 'header-value'},
        //withCredentials: true,
        data: {resource: $scope.resource},
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
        console.log(data);
      });
      //.error(...)
      //.then(success, error, progress); 
      // access or attach event listeners to the underlying XMLHttpRequest.
      //.xhr(function(xhr){xhr.upload.addEventListener(...)})
    }
    /* alternative way of uploading, send the file binary with the file's content-type.
       Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
       It could also be used to monitor the progress of a normal http post/put request with large data*/
    // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
  };
}]);

app.controller('ResourceDetailCtrl', ['$scope', '$routeParams', 'ResourceFactory', '$location',
	function($scope, $routeParams, ResourceFactory, $location){
		$scope.resource = ResourceFactoryFactory.show({id: $routeParams.id});
		
		$scope.updateResourceFactory = function (){
			ResourceFactory.update($scope.resource);
			$location.path('/resources');
		}
		
		$scope.cancel = function(){
			$location.path('/resources');
		}
	}
]);

app.controller('ResourceCreationCtrl', ['$scope', 'ResourceFactorysFactory', '$location',
	function($scope, ResourceFactorysFactory, $location ){
		//callback for ng-click 'createNewResourceFactory'
		$scope.resourceForm = {};
		$scope.resourceForm.name = "NAME";
		$scope.resourceForm.description = "DESCRIPTION";
		$scope.createNewResourceFactory = function(){
			console.log($scope.resourceForm)
			ResourceFactory.create($scope.resourceForm);
			$location.path('/resources');
		}
	}
]);