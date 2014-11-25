var ideaBin = angular.module('ideaBin', 
	[ 'ngRoute', 
		'templates', 
		'ideaBin.ideaServices', 
		'ideaBin.directoryServices', 
		'ideaBin.resourceServices', 
		'ideaBin.ideaControllers', 
		'ideaBin.directoryControllers',
		'ideaBin.resourceControllers']);

// for compatibility with Rails CSRF protection

ideaBin.config([
  '$httpProvider', function($httpProvider){
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')
	}
]);

ideaBin.config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/ideas', {
					templateUrl: 'ideas/index.html', 
					controller: 'IdeaIndexCtrl'
				})
				.when('/ideas/new', {
					templateUrl: 'ideas/new.html', 
					controller: 'IdeaCreationCtrl'
				})
				.when('/ideas/:id', {
					templateUrl: 'ideas/edit.html', 
				})
				.when('/directories', {
					templateUrl: 'directories/index.html', 
					controller: 'DirectoryIndexCtrl'
				})
				.when('/directories/new', {
					templateUrl: 'directories/new.html', 
					controller: 'DirectoryCreationCtrl'
				})
				.when('/directories/:id', {
					templateUrl: 'directories/edit.html', 
					controller: 'DirectoryDetailCtrl'
				})
				.otherwise('/', {
					templateUrl: 'directories/index.html', 
					controller: 'DirectoryIndexCtrl'
				});
				
        $locationProvider.html5Mode({
					enabled: true,
					requireBase: false
				});
				//$routeProvider.when('/idea-detail/:id', {templateUrl: 'partials/idea-detail.html', controller: 'IdeaDetailCtrl'});
        //$routeProvider.when('/idea-creation', {templateUrl: 'partials/idea-creation.html', controller: 'IdeaCreationCtrl'});
        //$routeProvider.otherwise({redirectTo: '/idea-list'});
    });
		
ideaBin.run(function(){
  console.log('angular ideaBin running');
});