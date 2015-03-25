var services = angular.module('ideaBin.contactServices', ['ngResource']);

services.factory('Contact', function ($resource) {
    return $resource('/contacts/:id', {id: '@id'}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' },
				show: { method: 'GET', isArray: false},
        update: { method: 'PUT'},
        delete: { method: 'DELETE' }
    });
});
