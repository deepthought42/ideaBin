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
    this.on("complete", function(file) { alert("Added file."); });
  }
};
