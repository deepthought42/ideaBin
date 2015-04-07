# app/controllers/registrations_controller.rb
class RegistrationsController < Devise::RegistrationsController
  def new
    super
  end

  def create
    super
  end

  def update
		@user = User.find(params[:id])
		@user.email = params[:email]
		#avatar_path = "/public/images/#{current_user.id}/#{@user.name}"
		
		#if params[:avatar]
		#		@user.cover_img = params[:avatar]
		#		DataFile.save(params[:avatar], avatar_path)
		#end#

    if @user.update
			render json: @user
		else
			puts "THERE WAS AN ISSUE UPDATING"
    end
  end
end 