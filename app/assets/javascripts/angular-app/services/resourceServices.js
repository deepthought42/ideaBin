var services = angular.module('ideaBin.resourceServices', ['ngResource']);

services.factory('ResourcesFactory', function ($resource) {
    return $resource('/resources.json', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

services.factory('ResourceFactory', function ($resource) {
    return $resource('/resources/:id.json', {}, {
        show: { method: 'GET', params: {id: '@id'}},
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});