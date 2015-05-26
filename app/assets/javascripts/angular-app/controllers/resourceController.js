var app = angular.module('ideaBin.resourceControllers', [])

app.controller("ResourceIndexCtrl", ['$rootScope', '$scope', '$localStorage', 'Resource', '$location', '$upload', '$http',
	function($rootScope, $scope, $localStorage, Resource, $location, $upload, $http) {
		$scope.$storage = $localStorage;
		$scope.editableResourceTypes = ["txt", "rb", "html", "log", "js", "php", "scss"];
		$scope.resourceLogos = {"text":"fa-file-text", "rb": "fa-file-code-o", "html": "fa-file-code-o" , "log":"fa-file-o", "js":"fa-file-code-o", "php":"fa-file-code-o", "jpg": "fa-file-image-o", "css": "fa-file-code-o", "scss": "fa-file-code-o", "no-format": "fa-file-o"}

		//move to event
		$scope.$on('loadResources', function(event, path){
			$scope.resources = Resource.query({path: path});
		});
	
		$scope.$on('addResourceToIndex', function(event, resource){
			$scope.resources.push(resource);
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
					//alert("SUCCESS");
					var hiddenElement = document.createElement('a');

					hiddenElement.href = 'data:attachment/*,' + encodeURI(data);
					hiddenElement.target = '_blank';
					hiddenElement.download = filename;
					hiddenElement.click();
				}).
				error(function(data, status, headers, config) {
					alert("Error downloading file");
				});
		};
		
		
	}
]);

app.controller('ResourceDetailCtrl', ['$scope', '$localStorage', '$sessionStorage', 'Resource', '$http',
	function($scope, $localStorage, $sessionStorage, Resource, $http){
		$scope.$storage = $localStorage
		$scope.$session = $sessionStorage
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
				ace.require('ace/ext/settings_menu').init($scope.editor);
 				var modelist = ace.require("ace/ext/modelist");
        // the file path could come from an xmlhttp request, a drop event,
        // or any other scriptable file loading process.
        // Extensions could consume the modelist and use it to dynamically
        // set the editor mode. Webmasters could use it in their scripts
        // for site specific purposes as well.
        var mode = modelist.getModeForPath(resource_name).mode;
				$scope.editor.session.setMode(mode);
				$scope.editor.commands.addCommands([{
					name: "showSettingsMenu",
					bindKey: {win: "Ctrl-q", mac: "Command-q"},
					exec: function(editor) {
						editor.showSettingsMenu();
					}
				}]);
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
			$scope.resource.filename = $scope.$storage.resource;
			$scope.resource.dir_path = $scope.$storage.repo.path + $scope.$storage.dir_path;
			if($scope.resource.comment){
				Resource.update($scope.resource);
			}
			else{
				alert("A comment is required in order to save");
			}
		}
	}
]);

app.controller('ResourceCreationCtrl', ['$scope', '$rootScope', 'Resource', '$upload',
	function($scope, $rootScope, Resource, $upload ){

		$scope.$watch('files', function () {
      $scope.upload($scope.files);

    });

		$scope.upload = function(files) {			
			var confirmed = true;
			if($scope.resources && $scope.resources.indexOf(files[0].name) > -1){
				confirmed = confirm("Are you sure you want to overwrite the current copy?")	
			}
			if(confirmed){			
				for (var i = 0; i < files.length; i++) {
					var comment = prompt("Please describe the upload");
					var file = files[i];
					$scope.filename = file.filename;
					$upload.upload({
						url: '/resources.json', 
						method: 'POST', // or 'PUT',
						headers: {'XSRF-TOKEN': ''},
						//withCredentials: true,
						data: {	comment: comment, 
										resource: $scope.resource, 
										repo_id:	$scope.$storage.repo.id
						},
						file: file
					}).progress(function(evt) {
						console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
					}).success(function(data, status, headers, config) {
						$rootScope.$broadcast('addResourceToIndex', file.name);
						$rootScope.$broadcast("getContributingUserCount", $scope.$storage.current_idea.idea)
						$rootScope.$broadcast("getCommitCount", $scope.$storage.current_idea.idea)
					}).error(function(data, status, headers, config) {
						console.log("There was an error uploading for the file. It may already be up to date");
					})
				}
			}
		};
	}
]);
