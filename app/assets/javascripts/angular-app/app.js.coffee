@ideaBin = angular.module('ideaBin', [
  # additional dependencies here, such as restangular
  'templates'
])

# for compatibility with Rails CSRF protection

@ideaBin.config([
  '$httpProvider', ($httpProvider)->
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')
])

@ideaBin.run(->
  console.log 'angular ideaBin running'
)