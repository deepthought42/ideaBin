html5Upload.initialize({
    // URL that handles uploaded files
    uploadUrl: '/file/upload',

    // HTML element on which files should be dropped (optional)
    dropContainer: document.getElementById('dragndropimage'),

    // HTML file input element that allows to select files (optional)
    inputField: document.getElementById('upload-input'),

    // Key for the file data (optional, default: 'file')
    key: 'File',

    // Additional data submitted with file (optional)
    data: { ProjectId: 1, ProjectName: 'Demo' },

    // Maximum number of simultaneous uploads
    // Other uploads will be added to uploads queue (optional)
    maxSimultaneousUploads: 2,

    // Callback for each dropped or selected file
    // It receives one argument, add callbacks 
    // by passing events map object: file.on({ ... })
    onFileAdded: function (file) {

        var fileModel = new models.FileViewModel(file);
        uploadsModel.uploads.push(fileModel);

        file.on({
            // Called after received response from the server
            onCompleted: function (response) {
                fileModel.uploadCompleted(true);
            },
            // Called during upload progress, first parameter
            // is decimal value from 0 to 100.
            onProgress: function (progress, fileSize, uploadedBytes) {
                fileModel.uploadProgress(parseInt(progress, 10));
            }
        });
    }
});