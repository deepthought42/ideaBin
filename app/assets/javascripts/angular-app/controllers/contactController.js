var app = angular.module('ideaBin.contactController', []);


app.controller('contactController', ['$scope', 'Contact', '$location',
	function($scope, Contact, $location ){
		$scope.options = ['PRAISE', 'ISSUE', 'FUNC_REQUEST', 'QUESTION']
		//callback for ng-click 'createNewResourceFactory'
		$scope.contact = {};
		$scope.contact.reason = $scope.options[0]
		$scope.createContact = function(){
			console.log($scope.contact)
			Contact.create($scope.contact);
			$location.path('/contact');
		}
	}
]);
