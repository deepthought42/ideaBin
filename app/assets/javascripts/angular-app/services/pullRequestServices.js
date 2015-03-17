var services = angular.module('ideaBin.pullRequestServices', ['ngResource']);

services.factory('PullRequest', function ($resource) {
    return $resource('/pullRequests/:id.json',{id: '@id'}, {
        query: { method: 'GET', isArray: true },
				create: { method: 'POST' },
				show: { method: 'GET', isArray: false},
			})
});