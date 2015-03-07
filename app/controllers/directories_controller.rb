class DirectoriesController < ApplicationController
	before_filter :authenticate_user!
	#before_action :set_directory, except: [:show, :new, :create, :index]
	respond_to :json
	
	# GET /directories
  # GET /directories.json
  def index
		if(params[:parent_id])
			@directories = Directory.where(parent_id: params[:parent_id])
		end
		
    respond_with(@directories)
  end

	def topDir
		@directory = Directory.where(idea_id: params[:id], is_top: true).first
		respond_with(@directory)
  end
	
  def show
		@directory = Directory.find(params[:id])
		respond_with(@directory)
  end

  def new
    @directory = Directory.new(:parent_id => params[:parent_id])
		respond_with(@directory)
  end

  def edit
  end

  def create
		@idea = Idea.find(params[:idea_id])
		@parentDir = Directory.find(params[:parent_id])
		
    @directory = Directory.new(directory_params)
		@directory.name = directory_params[:name]
		@directory.idea_id = @idea.id
		
		#needs to be altered to reflect infinite level depth of folder structure
		@directory.path = "#{@parentDir.path}/#{@directory.name}"

		unless File.exists?(@directory.path)
			Dir.mkdir(@directory.path)
		end
		
		if(directory_params[:parent_id])
			@directory.is_top = false
			@directory.parent_id = directory_params[:parent_id]
		else
			@directory.is_top = true
		end
		
		flash[:notice] = "#{directory_params} : #{@directory.name}" if @directory.save
		respond_with(@directory)
  end

  def update
    @directory.update(directory_params)
    @directory.name = directory_params[:name]
		flash[:notice] = "#{directory_params} : #{@directory.name}" if @directory.save
		respond_with(@directory)
  end

  def destroy
		@directory = Directory.find(params[:id])
    @directory.destroy
    respond_with(@directory)
  end

  private
    def set_directory
      @directory = Directory.find(params[:id])
    end

    def directory_params
      params.require(:directory).permit(:name, :parent_id)
    end
end
