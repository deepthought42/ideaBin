var ideaBin = angular.module('ideaBin', 
	[ 'ngRoute', 
		'templates', 
		'ideaBin.ideaServices', 
		'ideaBin.directoryServices', 
		'ideaBin.ideaControllers',
		'ideaBin.ideaDirectives', 
		'ideaBin.directoryControllers',
		'ideaBin.resourceServices', 
		'ideaBin.resourceControllers',
		'ideaBin.userControllers',
		'angularFileUpload',
		'ui.ace',
		'Devise']);

// for compatibility with Rails CSRF protection

ideaBin.config([
  '$httpProvider', function($httpProvider){
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
	}
]);

ideaBin.config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/ideas', {
					templateUrl: 'idea/index.html', 
					controller: 'IdeaIndexCtrl'
				})
				.when('/ideas/new', {
					templateUrl: 'idea/new.html', 
					controller: 'IdeaCreationCtrl'
				})
				.when('/ideas/:id', {
					templateUrl: 'idea/edit.html', 
				})
				.when('/directories', {
					templateUrl: 'directory/index.html', 
					controller: 'DirectoryIndexCtrl'
				})
				.when('/directories/new', {
					templateUrl: 'directory/new.html', 
					controller: 'DirectoryCreationCtrl'
				})
				.when('/directories/:id', {
					templateUrl: 'directory/edit.html', 
					controller: 'DirectoryDetailCtrl'
				})
				.when('/users/signout', {
					templateUrl: 'idea/index.html', 
					controller: 'UserSessionCtrl'
				})
				.when('/sign_in', {
					templateUrl: 'user_session/new.html',
					controller:	'UserSessionCtrl'
				})
				.otherwise('/', {
					templateUrl: 'idea/index.html', 
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