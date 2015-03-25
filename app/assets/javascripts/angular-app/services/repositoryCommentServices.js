var services = angular.module('ideaBin.repositoryCommentServices', ['ngResource']);

services.factory('RepositoryComment', function ($resource) {
    return $resource('/repository_comments/:id.json', {id: '@id'}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' },
				show: { method: 'GET', isArray: false},
        update: { method: 'PUT'},
        delete: { method: 'DELETE' }
    });
});
