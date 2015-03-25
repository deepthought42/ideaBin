class ContactController < ApplicationController
	#creates a new contact record
	#
  # POST /repository_comments.json
  def create
		@contact = Comment.new()
		@contact.fname = params[:fname] 
		@contact.lname = params[:lname]
		@contact.email = params[:email]
		@contact.reason = params[:reason]
		@contact.message = params[:message]
		@contact.save
		
		respond_with(@comment)
  end
end
