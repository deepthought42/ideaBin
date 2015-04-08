class IdeasController < ApplicationController
  before_filter :authenticate_user!, except: [:index]
	before_action :set_idea, except: [:new, :create, :index, :userIdeas]
	respond_to :json
	
  # GET /ideas
  # GET /ideas.json
  def index
    @ideas = Idea.all

    render json: @ideas
  end


	#Finds an idea specified, and its top directory. If a user is not the owner of the idea
	#then the owners repo is copied.
	#
	# returns the idea requested
	#
	# GET /ideas/1
  # GET /ideas/1.json
	
  def show
    @idea = Idea.find(params[:id])
    #clone idea repo from owners copy if current user isn't owner
    if(current_user.id != @idea.user_id)
	    repo_path = "#{Rails.root}/public/data/repository/#{@idea.user_id}/#{@idea.name}"
			unless @idea.users.include?(current_user)
				@repo = Repository.new()
				@repo.path = "#{Rails.root}/public/data/repository/#{current_user.id}/#{@idea.name}"
				@repo.user = current_user
				@idea.repositories << @repo
			end
		else
			#load up existing repository
			@repo = Repository.where(user_id: current_user.id).where(idea_id: params[:id]).first
		end
		unless File.exists?("#{Rails.root}/public/data/repository/#{current_user.id}/#{@idea.name}")
			Dir.chdir("#{Rails.root}/public/data/repository/#{current_user.id}/")
			@git = Git.clone("#{Rails.root}/public/data/repository/#{@idea.user_id}/#{@idea.name}", @idea.name)	
		end
		render json: @idea

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
		@directoryParent = Directory.where("idea_id = ? AND is_top = ?", @idea.id, true).take		
    #clone idea repo from owners copy if current user isn't owner
		@repo = IdeasUsers.find(user_id: current_user.id, idea_id: @idea.id)
		
    if(current_user.id != @idea.user_id)
	    repo_path = "#{Rails.root}/public/data/repository/#{current_user.id}/#{@idea.name}"
			
			unless File.exists?(repo_path)
				Dir.mkdir(repo_path)
			end
      Dir.chdir(repo_path)
			if(!@repo)
				@git = Git.clone(repo_path, @idea.name)
				@repo = IdeasUsers.new()
				@repo.user_id = current_user.id
				@repo.idea_id = @idea.id
				@repo.save
			else
				#merge parent into existing repo
			end
			
    end
		
		respond_with(@idea)
  end

  # POST /ideas
  # POST /ideas.json
  def create
    @idea = Idea.new(ActiveSupport::JSON.decode(params[:idea]))
		
    @idea.user_id = current_user.id
		repo_path = "#{Rails.root}/public/data/repository/#{current_user.id}" 
		@idea.cover_img = params[:cover_img]
		
		unless File.exists?(repo_path)
			Dir.mkdir(repo_path)
		end
		@repo = Repository.new()
		@repo.path = "#{Rails.root}/public/data/repository/#{current_user.id}/#{@idea.name}"
		@repo.user = current_user 
		@idea.repositories << @repo
		@idea.save
			
		#create directory in database to associate the directory created in the file systems.
		Dir.chdir(repo_path)
		@git = Git.init(@idea.name)
		
		DataFile.save(params[:cover_img], @repo.path)
		@git.add(:all => true)
		@git.commit("Cover image added.")
		
		respond_with(@idea)
  end

  # PUT /ideas/1
  # PUT /ideas/1.json
  def update
    @idea = Idea.find(params[:id])
		@idea.name = params[:name]
		@idea.description = params[:description]
    repo_path = "#{Rails.root}/public/data/repository/#{current_user.id}/#{@idea.name}"
		cover_img_path = "/data/repository/#{current_user.id}/#{@idea.name}"
		
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
			render json: @idea
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
