class ContactsController < ApplicationController
	def show
    @contact = Contact.find(params[:id])
		render json: @contact
  end
	
	#creates a new contact record
	#
  # POST /contacts.json
  def create
		@contact = Contact.new()
		@contact.fname = params[:fname] 
		@contact.lname = params[:lname]
		@contact.email = params[:email]
		@contact.reason = params[:reason]
		@contact.message = params[:message]
		@contact.save
		
		respond_with(@contact)
  end
end
