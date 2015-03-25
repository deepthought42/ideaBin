var app = angular.module('ideaBin.contactControllers', []);


app.controller('ResourceCreationCtrl', ['$scope', 'Contact', '$location',
	function($scope, Contact, $location ){
		//callback for ng-click 'createNewResourceFactory'
		$scope.contact = {};
		$scope.createContact = function(){
			console.log($scope.contact)
			Resource.create($scope.contact);
			$location.path('/contact');
		}
	}
]);