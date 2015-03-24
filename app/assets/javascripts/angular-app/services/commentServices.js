var services = angular.module('ideaBin.commentServices', ['ngResource']);

services.factory('Comment', function ($resource) {
    return $resource('/resources/:id', {id: '@id'}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' },
				show: { method: 'GET', isArray: false},
        update: { method: 'PUT'},
        delete: { method: 'DELETE' }
    });
});
