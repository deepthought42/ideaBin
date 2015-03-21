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
		'ideaBin.navigationControllers',
		'ideaBin.pullRequestControllers',
		'ideaBin.pullRequestServices',
		'ideaBin.repositoryServices',
		'ideaBin.repositoryControllers',
		'angularFileUpload',
		'ui.ace',
		'Devise',
		'ngStorage']);

// for compatibility with Rails CSRF protection

ideaBin.config([
  '$httpProvider', function($httpProvider){
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
	}
]);

ideaBin.config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/ideas', {
					templateUrl: 'idea/index.html', 
				})
				.when('/ideas/new', {
					templateUrl: 'idea/new.html', 
				})
				.when('/ideas/:id', {
					templateUrl: 'idea/edit.html', 
				})
				.when('/directories', {
					templateUrl: 'directory/index.html', 
				})
				.when('/directories/new', {
					templateUrl: 'directory/new.html', 
				})
				.when('/directories/:id', {
					templateUrl: 'directory/edit.html', 
				})
				.when('/users/edit', {
					templateUrl: 'user/edit.html', 
					controller: 'UserSessionCtrl'
				})
				.when('/users/signout', {
					templateUrl: 'idea/index.html', 
					controller: 'UserSessionCtrl'
				})
				.when('/sign_in', {
					templateUrl: 'user_session/new.html',
					controller:	'UserSessionCtrl'
				})
				.when('/register', {
					templateUrl: 'user/register.html',
					controller:	'UserSessionCtrl'
				})
				.when('/resources/:id', {
					templateUrl:  'resource/edit.html',
				})
				.when('/pullRequests', {
					templateUrl:  'pull_request/index.html',
				})
				.when('/pullRequest/:id', {
					templateUrl:  'pull_request/show.html',
				})
				.otherwise({redirectTo : '/ideas'});
				
        $locationProvider.html5Mode({
					enabled: true,
					requireBase: false
				});
    });
		
ideaBin.run(function(){
  console.log('angular ideaBin running');
});