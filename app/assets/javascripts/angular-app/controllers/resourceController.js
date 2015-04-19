var app = angular.module('ideaBin.resourceControllers', []);

app.controller("ResourceIndexCtrl", ['$rootScope', '$scope', '$localStorage', 'Resource', '$location', '$upload', '$http',
	function($rootScope, $scope, $localStorage, Resource, $location, $upload, $http) {
		$scope.$storage = $localStorage;
		$scope.editableResourceTypes = ["txt", "rb", "html", "log", "js", "php", "scss"];
		$scope.resourceLogos = {"text":"txt.png", "rb": "ruby.png", "html": "html.png" , "log":"file.png", "js":"code.png", "php":"php.png", "jpg": "picture.png", "css": "css.png", "scss": "css.png", "no-format": "file.png"}

		//move to event
		$scope.$on('loadResources', function(event, path){
			$scope.resources = Resource.query({path: path});
		});
		
		$scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
	
		$scope.showResource = function(resourceText){
			$scope.editor.setValue(resourceText);
		};
		
		$scope.getResourceIcon = function(resource_name){
			extension = resource_name.substr(resource_name.lastIndexOf('.') + 1);
			if( $scope.resourceLogos[extension])
				return $scope.resourceLogos[extension]
			else
				return $scope.resourceLogos["no-format"]
		}

  	$scope.deleteResource =  function(resourceName){
			$localStorage.repo.path + $localStorage.dir_path + resourceName;
			Resource.delete({id: $localStorage.repo.id, path: resourceName});
		
			var index = $scope.resources.indexOf(resourceName);
			$scope.resources.splice(index, 1);
		};
		
		$scope.createNewResource = function(){
			Resource.create();
			$location.path('/resources');
		};
		
		$scope.editResource = function (resource_name) {
			$("#pullRequestIndexPanel").hide();
			$("#pullRequestDetailsPanel").hide();
			$("#ideaMainPanel").hide();
			$("#resourceEditPanel").show();
		
			//check for if resource name is of a type that is supported
			var ext = resource_name.substr(resource_name.lastIndexOf('.') + 1);
			
			if($scope.editableResourceTypes.indexOf(ext) > -1){
				$rootScope.$broadcast("loadResourceComments", resource_name)
				$rootScope.$broadcast("editResource", resource_name, ext);
			}
			else{
				alert(resource_name + " is not currently editable in IdeaBin. Please download to make changes");
			}
		};
		
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
		};
		
		$scope.upload = function(files) {			
			var confirmed = true;
			if($scope.resources && $scope.resources.indexOf(files[0].name) > -1){
				confirmed = confirm("Are you sure you want to overwrite the current copy?")	
			}
			if(confirmed){			
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
						repo_id:	$scope.$storage.repo.id},
						file: file, // or list of files ($files) for html5 only
						//fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
						// customize file formData name ('Content-Disposition'), server side file variable name. 
						//fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
						// customize how data is added to formData. See #40#issuecomment-28612000 for sample code
						//formDataAppender: function(formData, key, val){}
					}).progress(function(evt) {
						console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
					}).success(function(data, status, headers, config) {
						$scope.resources = Resource.query({path: $localStorage.repo.path + $scope.$storage.dir_path});
					}).error(function(data, status, headers, config) {
						console.log("There was an error uploading for the file. It may already be up to date");
					})
					//.then(success, error, progress); 
					// access or attach event listeners to the underlying XMLHttpRequest.
					//.xhr(function(xhr){xhr.upload.addEventListener(...)})
				}
			}
		};
	}
]);

app.controller('ResourceDetailCtrl', ['$scope', '$localStorage', 'Resource', '$http',
	function($scope, $localStorage, Resource, $http){

		$scope.aceLoaded = function(_editor) {
			$scope.editor = _editor;
			// Options
			//_editor.setReadOnly(true);
		};

		$scope.aceChanged = function(e) {
			//TODO : Save changes
		};
		
		$scope.$on('editResource', function(event, resource_name, extension) { 
			$http.get("/resources/1/contents", {params: 
								{filename: resource_name, 
								 path: $localStorage.repo.path + $localStorage.dir_path}
			}).success(function(data){ 
				$scope.resource = {};
				$scope.resource.content = data;

 				var modelist = ace.require("ace/ext/modelist");
        // the file path could come from an xmlhttp request, a drop event,
        // or any other scriptable file loading process.
        // Extensions could consume the modelist and use it to dynamically
        // set the editor mode. Webmasters could use it in their scripts
        // for site specific purposes as well.
        var mode = modelist.getModeForPath(resource_name).mode;
				$scope.editor.session.setMode(mode);

				$scope.editor.setValue(data);

				$localStorage.resource = resource_name;
			}).error(function(data){
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
