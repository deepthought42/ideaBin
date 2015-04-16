class UsersController < ApplicationController
  before_action :authenticate_user!

  ## calling this method will upload an image for the current 
  #    user and save it. 
  #
  # PUT /users
  # PUT /users
  def update
    if params[:avatar]
      current_user.avatar = params[:avatar]
    end
		
    if current_user.save
	render json: @idea
    else
	puts "THERE WAS AN ISSUE UPDATING"
    end
  end
end
