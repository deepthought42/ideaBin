var services = angular.module('ideaBin.ideaServices', ['ngResource']);

services.factory('IdeasFactory', function ($resource) {
    return $resource('/ideas.json', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

services.factory('IdeaFactory', function ($resource) {
    return $resource('/ideas/:id.json', {}, {
        show: { method: 'GET', params: {id: '@id'}},
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});