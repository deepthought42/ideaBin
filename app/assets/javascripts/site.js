$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

Dropzone.options.myDropzone = {
  init: function() {
    this.on("sending",function(file, xhr, formData){
    	token = $('meta[name="csrf-token"]').attr('content');
	    xhr.setRequestHeader('X-CSRF-Token', token);
    });
    this.on("complete", function(file) { 
      $('form.edit_idea > input#alteredStatus').val('1');
      alert("Added file."); 
    });
  }
};

$(window).ready(function(){

  var $container = $("#masonry");
  $container.imagesLoaded(function(){
    $container.masonry({
      columnWidth: 200,
      itemSelector: '.item'
    });
  });
});

var app = angular.module("ideaBin", ['ngResource', 'ngRoute']);
