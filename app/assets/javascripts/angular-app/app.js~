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
		'ideaBin.userServices',
		'ideaBin.navigationControllers',
		'ideaBin.pullRequestControllers',
		'ideaBin.pullRequestServices',
		'ideaBin.repositoryServices',
		'ideaBin.repositoryControllers',
		'ideaBin.commentServices',
		'ideaBin.commentControllers',
		'ideaBin.repositoryCommentServices',
		'ideaBin.repositoryCommentControllers',
		'ideaBin.contactServices',
		'ideaBin.contactController',
		'ideaBin.resourceCommentServices',
		'ideaBin.resourceCommentControllers',
		'angularFileUpload',
		'ui.ace',
		'ngStorage',
		'ipCookie',
		'ng-token-auth']);

// for compatibility with Rails CSRF protection

ideaBin.config([
  '$httpProvider', function($httpProvider){
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  /*
   Response interceptors are stored inside the 
   $httpProvider.responseInterceptors array.
   To register a new response interceptor is enough to add 
   a new function to that array.
  */

  $httpProvider.interceptors.push(
	function() {
            return {
                'request': function(config) {
		console.log("attack of the request interceptor");
		console.log("header " + config.headers['access-token']);
		for( var key in config.headers){
			console.log("Header Key :: " +key+" ; Val :: " + config.headers[key])
		}
      		if (config.headers['access-token']) {
                  $httpProvider.defaults.headers.common['Access-token'] = config.headers['access-token'];
		  $httpProvider.defaults.headers.common['Token-type'] = config.headers['token-type'];
                  $httpProvider.defaults.headers.common['Client'] = config.headers['client'];
		  $httpProvider.defaults.headers.common['Expiry'] = config.headers['expiry'];
		  $httpProvider.defaults.headers.common['Uid'] = config.headers['uid'];
                }
                return config;
          }
       };
  });
}]);
ideaBin.config(function($httpProvider, $authProvider){
	$authProvider.configure({
	      tokenValidationPath: '/auth/validate_token',
	       tokenFormat: {
		    "access-token": "{{ token }}",
		    "token-type": "Bearer",
		    "client": "{{ clientId }}",
		    "expiry": "{{ expiry }}",
		    "uid": "{{ uid }}"
		  },
	      storage: 'localStorage',

	  handleLoginResponse: function(response) {
		return response;
	  },

          handleAccountUpdateResponse: function(response) {
            return response;
          },

          handleTokenValidationResponse: function(response) {
            return response;
          }

        })
});

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
				.when('/contact_us', {
					templateUrl:  'contact_us.html',
				})
				.otherwise({redirectTo : '/ideas'});
				
        $locationProvider.html5Mode({
					enabled: true,
					requireBase: false
				});
    });
		
ideaBin.run(['$rootScope', '$injector', function($rootScope,$injector) { 
	$injector.get("$http").defaults.transformRequest = function(data, headersGetter) { 
		if ($rootScope.oauth) headersGetter()['Authorization'] = "Bearer "+$rootScope.oauth.access_token; 
    	if (data) {
		return angular.toJson(data); 
    	} 
  }
 }]);
