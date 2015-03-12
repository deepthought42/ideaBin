class IdeasController < ApplicationController
  before_filter :authenticate_user!
	before_action :set_idea, except: [:new, :create, :index]
	respond_to :json
	
  # GET /ideas
  # GET /ideas.json
  def index
    @ideas = Idea.all

    respond_with(@ideas)
  end

  # GET /ideas/1
  # GET /ideas/1.json
  def show
    @idea = Idea.find(params[:id])

		respond_with(@idea)

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
		@directoryParent = Directory.where("idea_id = ? AND is_top = ?", @idea.id, true).take
		session[:directory_id] = @directoryParent.id

    repo_path = "#{Rails.root}/public/data/repository/#{current_user.id}/#{@idea.name}"
		
    #clone idea repo from owners copy if current user isn't owner
		unless File.exists?(repo_path)
			Dir.mkdir(repo_path)
		end

    if(current_user.id != @idea.user_id)
      Dir.chdir(repo_path)
    	@git = Git.clone(repo_path, @idea.name)
    end
		
		respond_with(@idea)
  end

  # POST /ideas
  # POST /ideas.json
  def create
    @idea = Idea.new(ActiveSupport::JSON.decode(params[:idea]))
		
    @idea.user_id = current_user.id
    directory = "#{Rails.root}/public/images/cover_images/"
		@idea.cover_img = params[:cover_img]

		DataFile.save(params[:cover_img], directory)
		repo_path = "#{Rails.root}/public/data/repository/#{current_user.id}" 
		unless File.exists?(repo_path)
			Dir.mkdir(repo_path)
		end
		
		if @idea.save
				#create directory in database to associate the directory created in the file systems.
			@directory = Directory.new()
			@directory.name = @idea.name
			@directory.idea_id = @idea.id
			@directory.path = "#{repo_path}/#{@idea.name}"
			@directory.is_top = true
			Dir.chdir(repo_path)
			@git = Git.init(@idea.name)

			@directory.save
		end
		respond_with(@idea)
  end

  # PUT /ideas/1
  # PUT /ideas/1.json
  def update
    @idea = Idea.find(params[:id])
		@idea.name = params[:name]
		@idea.description = params[:description]
    repo_path = "#{Rails.root}/public/data/repository/#{current_user.id}/#{@idea.name}"
		cover_img_path = "#{Rails.root}/public/images/cover_images/"
		
		if params[:cover_img]
				@idea.cover_img = params[:cover_img]
				DataFile.save(params[:cover_img], cover_img_path)
		end
		
    Dir.chdir(repo_path)
    @git = Git.init
    @gitcommit = ""
    if params[:alteredStatus] == '1'
      @gitcommit = "it was committed"
      @git.add(:all => true)
      @git.commit('this is a commit...REMEMBER TO CHANGE THIS TO USER DEFINED MESSAGE') 
    end

    if @idea.save
			respond_with(@idea)
		else
			puts "THERE WAS AN ISSUE UPDATING"
    end
  end

  # DELETE /ideas/1
  # DELETE /ideas/1.json
  def destroy
    @idea = Idea.find(params[:id])
    repo_path = "#{Rails.root}/public/data/repository/#{current_user.id}/#{@idea.name}"
    FileUtils.rm_rf(repo_path)
    @idea.destroy

    respond_with(@idea)
 end
 
  # PUT /ideas/:id/uploadCover.json
  def uploadCover
		@idea = Idea.find(params[:id])
		cover_img_path = "#{Rails.root}/public/images/cover_images/"
		
		if params[:cover_img]
				@idea.cover_img = params[:cover_img]
				DataFile.save(params[:cover_img], cover_img_path)
		end
		
		if @idea.save
			puts "Upload successful"
			respond_with(@idea)
		else
			puts "THERE WAS AN ISSUE UPDATING COVER IMAGE."
    end
  end

	#GET /userIdeas/:id 
	def userIdeas
		@ideas = Idea.where(user_id: params[:id])
		
		if @ideas
			respond_with(@ideas)
		else
			render json: {errors: "Could not find files for user"}
		end
	end
 
 private
    def set_idea
      @idea = Idea.find(params[:id])
    end

    def idea_params
			params.require(:idea).permit(:name, :description, :cover_img_file_name)
    end
end
