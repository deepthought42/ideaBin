// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready(function(){
	$("#directoryForm").hide();
	
	$("#addFolderIcon").click(function(){
		alert("add folder clicked!");
		$("#directoryForm").show();
	});
	
	$(".close").click(function(){
		$(this).parent().hide();
	});
		
	$("form#new_directory").submit(function(e) {
		e.preventDefault();
		$.ajax({url: '/directories',
			type: 'POST',
			dataType: 'html',
			data: $('form#new_directory').serialize(),
			error: function(jqXHR, textStatus, errorThrown){
				$('body').append("AJAX Error: #{textStatus}");
			},
			success: function(data, textStatus, jqXHR){
				alert("ADDED");
			}
		});
	});
});
				
				