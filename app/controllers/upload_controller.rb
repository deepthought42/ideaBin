class UploadController < ApplicationController
	before_filter :authenticate_user!

  def index
     render :file => 'app\views\upload\uploadfile.rhtml'
  end
  def create
    post = DataFile.save(params)
	idea_id = session[:idea_id]
	unless File.exists?("#{Rails.root}/public/data/repository/#{current_user}"+idea_id) 
		Dir.mkdir("#{Rails.root}/public/data/repository/#{current_user}"+idea_id)
	end
	#session[:idea_id]
    render :text => "File has been uploaded successfully"
  end
end
