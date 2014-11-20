@idea = angular
  .module('ideaBin.idea', [
    # additional dependencies here
  ])
  .run(->
    console.log 'idea running'
  )