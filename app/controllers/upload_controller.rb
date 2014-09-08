class UploadController < ApplicationController
	before_filter :authenticate_user!

  def index
     render :file => 'app\views\upload\uploadfile.rhtml'
  end
  def create
  	idea_id = session[:idea_id]
	  unless File.exists?("#{Rails.root}/public/data/repository/#{current_user.id}") 
		  Dir.mkdir("#{Rails.root}/public/data/repository/#{current_user.id}")
  	end
	  post = DataFile.save(params, current_user.id, session[:idea_id])

	  #session[:idea_id]
    render :text => "File has been uploaded successfully"
  end
end
