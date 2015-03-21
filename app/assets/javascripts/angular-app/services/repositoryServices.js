var services = angular.module('ideaBin.repositoryServices', ['ngResource']);

services.factory('Repository', function ($resource) {
	return $resource('/repositoriess/:id.json',{id: '@id'}, {
		query: { method: 'GET', isArray: true },
		create: { method: 'POST' },
		show: { method: 'GET', isArray: false},
	})
});