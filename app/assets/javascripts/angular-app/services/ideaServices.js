var services = angular.module('ideaBin.ideaServices', ['ngResource']);

services.factory('Idea', function ($resource) {
    return $resource('/ideas/:id.json', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' },
				show: { method: 'GET', isArray: false},
        update: { method: 'PUT' },
        delete: { method: 'DELETE' }
    })
});