var app = angular.module('ideaBin.contactController', []);


app.controller('contactController', ['$scope', 'Contact', '$location',
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