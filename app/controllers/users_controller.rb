class UsersController < ApplicationController
  before_filter :authenticate_user!
	respond_to :json
	
	#	This method allows you to query a set of users ids
	#		for public user information
  # GET /users
  # GET /users.json
  def index
    @users = User.where(:id => JSON.parse(params[:user_ids]))
		
		render json: @users
  end
	
	# PUT /users/1
  # PUT /users/1.json
  def update
    @user = User.find(params[:id])
		@user.email = params[:email]
		#avatar_path = "/public/images/#{current_user.id}/#{@user.name}"
		
		#if params[:avatar]
		#		@user.cover_img = params[:avatar]
		#		DataFile.save(params[:avatar], avatar_path)
		#end#

    if @user.update
			respond_with(@user)
		else
			puts "THERE WAS AN ISSUE UPDATING"
    end
  end
end
