var services = angular.module('ideaBin.userServices', ['ngResource']);

services.factory('User', function ($resource) {
    return $resource('/users/:id', {id: '@id'}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' },
				show: { method: 'GET', isArray: false},
        update: { method: 'PUT'},
        delete: { method: 'DELETE' }
    });
});