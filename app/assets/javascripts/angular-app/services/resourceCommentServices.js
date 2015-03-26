var services = angular.module('ideaBin.resourceCommentServices', ['ngResource']);

services.factory('ResourceComment', function ($resource) {
    return $resource('/resource_comments/:id.json', {id: '@id'}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' },
				show: { method: 'GET', isArray: false},
        update: { method: 'PUT'},
        delete: { method: 'DELETE' }
    });
});
