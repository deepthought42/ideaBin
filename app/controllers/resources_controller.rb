class ResourcesController < ApplicationController
  before_filter :authenticate_user!

  # GET /resources
  # GET /resources.json
  def index
    @resources = Resource.where(idea_id: params[:idea_id])

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @resources }
    end
  end

  # GET /resources/1
  # GET /resources/1.json
  def show
    @resource = Resource.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @resource }
    end
  end

  # GET /resources/new
  # GET /resources/new.json
  def new
    @resource = Resource.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @resource }
    end
  end

  # GET /resources/1/edit
  def edit
    @resource = Resource.find(params[:id])
  end

  # POST /resources
  # POST /resources.json
  def create
#    @idea = Idea.find(session[:idea_id])

    directory = "#{Rails.root}/public/data/repository"
    unless File.exists?(directory)
      Dir.mkdir(directory)
    end
    post = DataFile.save(params['file'], directory)
    
    Dir.chdir(directory)
#    g = Git.init(@idea.name)
#    if params[:alteredStatus] == '1'
#      @gitcommit = "it was committed"
#      @git.add(:all => true)
#      @git.commit('this is a commit...REMEMBER TO CHANGE THIS TO USER DEFINED MESSAGE')
#    end
    	@resource = Resource.new
      @resource.idea_id = session[:idea_id]
      @resource.filename = params[:file].original_filename
      @resource.content_type = params[:file].content_type
      @resource.comment = params[:comment]

    respond_to do |format|
      if @resource.save
        format.html { redirect_to @resource, notice: "Resource was successfully created.#{session[:idea_id]}" }
        format.json { render json: @resource, status: :created, location: @resource }
      else
        format.html { render action: "new" }
        format.json { render json: @resource.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /resources/1
  # PUT /resources/1.json
  def update
    @resource = Resource.find(params[:id])

    respond_to do |format|
      if @resource.update_attributes(params[:resource])
        format.html { redirect_to @resource, notice: 'Resource was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @resource.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /resources/1
  # DELETE /resources/1.json
  def destroy
    @resource = Resource.find(params[:id])
    @resource.destroy

    respond_to do |format|
      format.html { redirect_to resources_url }
      format.json { head :no_content }
    end
  end
end
