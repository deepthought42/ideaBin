$(document).ready(function(){
	
	var $btnMenuToggle = $('#toggleBtn');
	var $btnAddFolder = $('#btnAddFolder');
	var $btnAddFile = $('#btnAddFile');

	$btnMenuToggle.click(function(){
	    $('#sideMenu').toggleClass('show-menu');
	    $(this).toggleClass('make-transparent');
	});

	$btnAddFolder.click(function(){
	    $('#wrapper-add-folder').slideToggle('fast');
	});

	$btnAddFile.click(function(){
	    $('#wrapper-add-file').slideToggle('fast');
	});


});
