class UsersController < ApplicationController
  before_action :authenticate_user!

  ## calling this method will upload an image for the current 
  #    user and save it. 
  #
  # PUT /users
  # PUT /users
  def update

      avatar_path = "public/images"
		
      if params[:avatar]
	current_user.avatar = params[:avatar]
	DataFile.save(params[:avatar], avatar_path)
      end
		
    if current_user.save
	render json: @idea
    else
	puts "THERE WAS AN ISSUE UPDATING"
    end
  end
end
