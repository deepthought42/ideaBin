class DirectoriesController < ApplicationController
	before_action :set_directory, except: [:new, :create, :index]

	respond_to :html
  
  def index
    @directories = Directory.all
    respond_with(@directories)
  end

  def show
    respond_with(@directory)
  end

  def new
    @directory = Directory.new
    respond_with(@directory)
  end

  def edit
  end

  def create
    @directory = Directory.new(directory_params)
    @directory.save
    respond_with(@directory)
  end

  def update
    @directory.update(directory_params)
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
