class DirectoriesController < ApplicationController
	before_filter :authenticate_user!
	#before_action :set_directory, except: [:show, :new, :create, :index]
	respond_to :json
	
	# GET /directories
  # GET /directories.json
  def index
		#@directories = Directory.where(parent_id: params[:parent_id])
		@directories = []
		Dir.glob("#{params[:path]}/*").each do |f| 
			if(File.directory?(f))
				@directories.push(File.basename(f))
			end
		end
    respond_with(@directories)
  end

  def create
		@path = "#{params[:path]}/#{directory_params[:name]}"

		unless File.exists?(@path)
			Dir.mkdir(@path)
		end
		
		respond_with(@path)
  end

	#will rename a folder within a given directory path.
  def update	
		@file = File.rename "#{params[:path]}/#{params[:old_name]}", "#{params[:path]}/#{directory_params[:name]}"

		respond_with({status:		'successfully renamed folder'})
  end

	#destroys a directory in file system at given path with given name
  def destroy
		FileUtils.rm_rf("#{params[:path]}/#{directory_params[:name]}")
    respond_with({status:	"successfully delected directory #{params[:path]}"})
  end

  private
    def set_directory
      @directory = Directory.find(params[:id])
    end

    def directory_params
      params.require(:directory).permit(:name, :parent_id)
    end
end
