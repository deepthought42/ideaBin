# app/assets/javascripts/main.js.coffee

# This line is related to our Angular app, not to our
# HomeCtrl specifically. This is basically how we tell
# Angular about the existence of our application.
@restauranteur = angular.module('restauranteur', [])

# This routing directive tells Angular about the default
# route for our application. The term "otherwise" here
# might seem somewhat awkward, but it will make more
# sense as we add more routes to our application.
@restauranteur.config(['$routeProvider', ($routeProvider) ->
  $routeProvider.
    otherwise({
      templateUrl: '../templates/home.html',
      controller: 'HomeCtrl'
    }) 
])

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

Dropzone.options.myDropzone = {
  init: function() {
    this.on("addedfile", function(file){
      var comment =  prompt("Please enter comment");
      $("#resourceComment").val(comment);
    });
    this.on("sending",function(file, xhr, formData){
      var comment = $("#resourceComment").val();
      if(comment === ""){
        alert("You must enter a comment in order to upload");
        xhr.abort();
      }
      else{
        xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
      }
    });
    this.on("complete", function(file) { 
      $('form.edit_idea > input#alteredStatus').val('1');
    });
  }
};


/*$(window).ready(function(){

  var $container = $(".masonry");
  $container.imagesLoaded(function(){
    $container.masonry({
      columnWidth: 100,
      itemSelector: '.item'
    });
  });
});
*/
//var app = angular.module("ideaBin", ['ngResource', 'ngRoute']);
