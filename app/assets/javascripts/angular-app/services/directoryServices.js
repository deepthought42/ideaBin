var services = angular.module('ideaBin.directoryServices', ['ngResource']);

services.factory('Directory', function ($resource) {
    return $resource('/directories/:id.json', {id: '@id'}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' },
				show: { method: 'GET', isArray: false },
        update: { method: 'PUT' },
        delete: { method: 'DELETE'}
    })
});