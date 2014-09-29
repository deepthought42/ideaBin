

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

$(window).ready(function(){

  var $container = $(".masonry");
  $container.imagesLoaded(function(){
    $container.masonry({
      columnWidth: 100,
      itemSelector: '.item'
    });
  });
});

//var app = angular.module("ideaBin", ['ngResource', 'ngRoute']);
