# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
$(document).ready ->
	$("#directoryForm").hide()
	
	$("#addFolderIcon").click ->
		$("#directoryForm").show()
		
	$(".close").click ->
		$(this).parent().hide()
		
	$("form#new_directory").submit (e)->
		e.preventDefault()
		$.ajax '/directories',
			type: 'POST'
			dataType: 'html'
			data: $('form#new_directory').serialize()
			error: (jqXHR, textStatus, errorThrown) ->
				$('body').append "AJAX Error: #{textStatus}"
			success: (data, textStatus, jqXHR) ->
				alert("ADDED")

				
				