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

$(document).ready(function(){
  var container = document.querySelector('#masonry');
  var masonry = new Masonry(container, {
    columnWidth: 50,
    itemSelector: '.item'
  });
});

