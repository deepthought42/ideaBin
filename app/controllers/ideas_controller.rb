class IdeasController < ApplicationController
  before_filter :authenticate_user!

  # GET /ideas
  # GET /ideas.json
  def index
    @ideas = Idea.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @ideas }
    end
  end

  # GET /ideas/1
  # GET /ideas/1.json
  def show
    @idea = Idea.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @idea }
    end
  end

  # GET /ideas/new
  # GET /ideas/new.json
  def new
    @idea = Idea.new
		
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @idea }
    end
  end

  # GET /ideas/1/edit
  def edit
    @idea = Idea.find(params[:id])
    session[:idea_id] = params[:id]
    repo_path = "#{Rails.root}/public/data/repository/#{current_user.id}/#{@idea.name}"

    #clone idea repo from owners copy if current user isn't owner
    if(current_user.id != @idea.user_id)
      unless File.exists?(repo_path)
        Dir.mkdir(repo_path)
      end

      Dir.chdir(repo_path)

    	@git = Git.clone(repo_path, @idea.name)  
    end
  end

  # POST /ideas
  # POST /ideas.json
  def create
    @idea = Idea.new(params[:idea])
    @idea.user_id = current_user.id
    directory = "#{Rails.root}/app/assets/images/cover_images/"
    @idea.cover_img = params[:idea][:cover_img].original_filename
    
    DataFile.save(params[:idea][:cover_img], directory)
    repo_path = "#{Rails.root}/public/data/repository/#{current_user.id}" 
    Dir.chdir(repo_path)	
    g = Git.init(@idea.name)

    if params[:alteredStatus] == '1'
      @gitcommit = "it was committed"
      @git.add(:all => true)
      @git.commit('this is a commit...REMEMBER TO CHANGE THIS TO USER DEFINED MESSAGE')
    end   
 	
    respond_to do |format|
      if @idea.save
        format.html { redirect_to @idea, notice: "Idea was successfully created.#{g}" }
        format.json { render json: @idea, status: :created, location: @idea }
      else
        format.html { render action: "new" }
        format.json { render json: @idea.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /ideas/1
  # PUT /ideas/1.json
  def update
    @idea = Idea.find(params[:id])

    repo_path = "#{Rails.root}/public/data/repository/#{current_user.id}/#{@idea.name}"
    Dir.chdir(repo_path)
    @git = Git.init
    @gitcommit = ""
    if params[:alteredStatus] == '1'
      @gitcommit = "it was committed"
      @git.add(:all => true)
      @git.commit('this is a commit...REMEMBER TO CHANGE THIS TO USER DEFINED MESSAGE') 
    end

	
    respond_to do |format|
      if @idea.update_attributes(params[:idea])
        format.html { redirect_to @idea, notice: "#{@gitcommit} ... #{params[:alteredStatus]} Idea was successfully updated." }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @idea.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /ideas/1
  # DELETE /ideas/1.json
  def destroy
    @idea = Idea.find(params[:id])
    repo_path = "#{Rails.root}/public/data/repository/#{current_user.id}/#{@idea.name}"
    FileUtils.rm_rf(repo_path)
    @idea.destroy

    respond_to do |format|
      format.html { redirect_to ideas_url }
      format.json { head :no_content }
    end
  end
end
