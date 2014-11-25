var services = angular.module('ideaBin.directoryServices', ['ngResource']);

services.factory('DirectoriesFactory', function ($resource) {
    return $resource('/directories.json', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

services.factory('DirectoryFactory', function ($resource) {
    return $resource('/directories/:id.json', {}, {
        show: { method: 'GET', params: {id: '@id'}},
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});