class UploadController < ApplicationController
  def index
     render :file => 'app\views\upload\uploadfile.rhtml'
  end
  def create
    post = DataFile.save(params)
    render :text => "File has been uploaded successfully"
  end
end
