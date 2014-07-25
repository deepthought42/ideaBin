Dropzone.options.myDropzone = {
  init: function() {
    this.on("complete", function(file) { alert("Added file."); });
  }
};