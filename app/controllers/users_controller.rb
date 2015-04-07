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
	

end
