var services = angular.module('ideaBin.ideaServices', ['ngResource']);

services.factory('Idea', function ($resource) {
    return $resource('/ideas/:id.json',{id: '@id'}, {
        query: { method: 'GET', isArray: true },
        create: { 
									$http.post(uploadUrl, fd, {
											withCredentials: true,
											headers: {'Content-Type': undefined },
											transformRequest: angular.identity
									}).success( ...all right!... ).error( ..damn!... ); 
								},
				show: { method: 'GET', isArray: false},
        update: { method: 'PUT' },
        delete: { method: 'DELETE' }, 
			})
});