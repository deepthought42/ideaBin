class UploadController < ApplicationController
	before_filter :authenticate_user!

  def index
     render :file => 'app\views\upload\uploadfile.rhtml'
  end
  def create
  	idea_id = session[:idea_id]
    directory = "#{Rails.root}/public/data/repository/#{current_user.id}" 
	  unless File.exists?(directory) 
		  Dir.mkdir(directory)
  	end
	  post = DataFile.save(params['file'], directory)

	  #session[:idea_id]
    render :text => "File has been uploaded successfully"
  end
end
