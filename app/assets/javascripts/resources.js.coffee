# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

$(document).ready ->
	###
	$.ajax '/resources',
    type: 'GET'
    dataType: 'html'
    error: (jqXHR, textStatus, errorThrown) ->
      $('body').append "AJAX Error: #{textStatus}"
    success: (data, textStatus, jqXHR) ->
      $('body').append "Successful AJAX call: #{data}"
	###
	$('.editResource').click ->
		alert("resource edit button clicked")
