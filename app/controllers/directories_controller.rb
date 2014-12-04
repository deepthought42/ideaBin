class DirectoriesController < ApplicationController
	before_filter :authenticate_user!
	before_action :set_directory, except: [:new, :create, :index]
	respond_to :json
  
	# GET /directories
  # GET /directories.json
  def index
    @directories = Directory.where(idea_id: params[:idea_id])
    respond_with(@directories)
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

    @directory = Directory.new(directory_params)
		@directory.name = directory_params[:name]
		@directory.idea_id = @idea.id
		@directory.path = "#{Rails.root}/public/data/repository/#{current_user.id}/#{@idea.name}";

		@directoryParent = Directory.where("idea_id = ? AND is_top = ?", @idea.id, true).take
		#flash[:notice] = "#{directory_params} : #{@idea.id} , #{true} , #{@directoryParent.id}"
		#@directory.parent_id = @directoryParent.id
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
    @directory.destroy
    respond_with(@directory)
  end

  private
    def set_directory
      @directory = Directory.find(params[:id])
    end

    def directory_params
      params.require(:directory).permit(:name)
    end
end
