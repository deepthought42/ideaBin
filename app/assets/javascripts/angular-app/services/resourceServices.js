var services = angular.module('ideaBin.resourceServices', ['ngResource']);

services.factory('Resource', function ($resource) {
    return $resource('/resources/:id.json', {id: '@id'}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' },
				show: { method: 'GET', isArray: false},
        update: { method: 'PUT'},
        delete: { method: 'DELETE' }
    });
});

services.factory('ResourceContent', function ($resource) {
    return $resource('/resources/:id/contents', {id: '@id'}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' },
				show: { method: 'GET', isArray: false},
        update: { method: 'PUT'},
        delete: { method: 'DELETE' }
    });
});
