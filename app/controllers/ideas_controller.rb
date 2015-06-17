class IdeasController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show, :commitCount, :contributingUserCount, :likeCount]
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
    if(current_user and current_user.id != @idea.user_id)
	    repo_path = "#{Rails.root}/public/data/repository/#{current_user.id}/#{@idea.name}"
			@repo = Repository.new()
			@repo.path = repo_path
			@repo.user = current_user
			@repo.idea = @idea
			@repo.save
		elsif(current_user and current_user.id == @idea.user_id)
			#load up existing repository
			@repo = Repository.where(user_id: current_user.id).where(idea_id: params[:id]).first
		else
			#load up existing repository
			@repo = Repository.where(user_id: params[:user_id]).where(idea_id: params[:id]).first
		end

		if current_user
			unless File.exists?("#{Rails.root}/public/data/repository/#{current_user.id}/#{@idea.name}")
				Dir.chdir("#{Rails.root}/public/data/repository/#{current_user.id}/")
				@git = Git.clone("#{Rails.root}/public/data/repository/#{@idea.user_id}/#{@idea.name}", @idea.name)
			end
		end
		@user = User.find(@idea.user_id)
		respond_to do |format|
			format.json  { render :json => {:idea => @idea,
				                              :user => @user }}
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

  end

  # POST /ideas
  # POST /ideas.json
  def create
    data =params[:data]
    data.gsub('\\', '')

    idea = ActiveSupport::JSON.decode(data)
    idea = idea["idea"]
    @idea = Idea.new()
    @idea.name = idea["name"]
    @idea.description = idea["description"]

    @idea.user_id = @current_user.id
    repo_path = "#{Rails.root}/public/data/repository/#{current_user.id}"
    @idea.cover_img = params[:cover_img]

		if @idea.save
			@repo = Repository.new()
			@repo.path = "#{Rails.root}/public/data/repository/#{current_user.id}/#{@idea.name}"
			@repo.idea = @idea
			@repo.user = current_user
			@repo.save
	    unless File.exists?(repo_path)
				Dir.mkdir(repo_path)
		  end
      #create directory in database to associate the directory created in the file systems.
  		Dir.chdir(repo_path)
  		@git = Git.init(@idea.name)
  		if params[:cover_img]
  			DataFile.save(params[:cover_img], @repo.path)
  			GitHelper.commitAll(@git, "Added cover image.")
  		end
		end


    respond_with(@idea)
  end

  ## Calling this method with the appropriate paramaters will result in saving
  #   an uploaded image if present. If a cover image is present the changes to
	#   the users repo will be added to git and committed. If other values are present
	# 	then they will be updated for the idea object passed
  #
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
			@git = GitHelper.init(repo_path, current_user.email, current_user.name)
			GitHelper.commitAll(@git, "Changed cover image.")
    end

    if @idea.save
			render json: @idea
		else
			render json: {error: "Failed to update idea"}, status: :unauthorized
    end
  end

  # DELETE /ideas/1
  # DELETE /ideas/1.json
  def destroy
    @idea = Idea.find(params[:id])
		if(@idea.user == current_user)
		  repo_path = "#{Rails.root}/public/data/repository/#{current_user.id}/#{@idea.name}"
		  FileUtils.rm_rf(repo_path)
		  @idea.destroy
		  respond_with(@idea)
		else
			render json: {error: "You must be the idea owner to delete an idea"}, status: :unauthorized
		end
 end

  # PUT /ideas/:id/uploadCover.json
  def uploadCover
		@idea = Idea.find(params[:id])

		if params[:cover_img]
			@idea.cover_img = params[:cover_img]
		end

		if @idea.save
			respond_with(@idea)
		else
			render json: {error: "Cover Image upload failed."}, status: :unprocessable_entity
    end
  end

	#GET /userIdeas/:id
	def userIdeas
		@ideas = Idea.where(user_id: params[:id])

		if @ideas
			respond_with(@ideas)
		else
			render json: {errors: "Could not find files for user."}
		end
	end

	#GET /idea/:id/commitCount.json
	def commitCount
		@idea = Idea.find(params[:id])
		repo_path = nil
		@git = nil

		if(current_user)
			repo_path = "#{Rails.root}/public/data/repository/#{current_user.id}/#{@idea.name}"
			@git = GitHelper.init(repo_path, current_user.email, current_user.name)
		else
			repo_path = "#{Rails.root}/public/data/repository/#{@idea.user_id}/#{@idea.name}"
			@git = GitHelper.init(repo_path, '', '')
		end

		if(@git.log)
			render json: {commit_count: @git.log.count  }
		else
			render json: {error: "Unable to calculate commit count"}, status: :unprocessable_entity
		end
	end

	#GET /idea/:id/contributingUserCount.json
	def contributingUserCount
		@idea = Idea.find(params[:id])
		@git = nil

		if(current_user)
			repo_path = "#{Rails.root}/public/data/repository/#{current_user.id}/#{@idea.name}"
			@git = GitHelper.init(repo_path, current_user.email, current_user.name)
		else
			repo_path = "#{Rails.root}/public/data/repository/#{@idea.user_id}/#{@idea.name}"
			@git = GitHelper.init(repo_path, '', '')
		end
		committing_user_arr = GitHelper.getContributors(@git)
		if(@git)
			render json: {user_count: committing_user_arr.count || 0}
		else
			render json: {error: "Unable to calculate number of users that have contributed"}, status: :unprocessable_entity
		end
	end

  def like
    @idea = Idea.find(params[:id])
    @user_likes = IdeaUsersLike.where(idea_id: @idea.id).where(user_id: current_user.id)
    if(current_user)
      if(@user_likes.empty?)
        @like = IdeaUsersLike.new()
  			@like.idea = @idea
  			@like.user = current_user
  			@like.save
      else
        @user_likes.destroy(@user_likes.first.id)
      end
      @num_likes = IdeaUsersLike.where(idea_id: @idea.id).count
      render json: {like_count: @num_likes}
    else
      @num_likes = IdeaUsersLike.where(idea_id: @idea.id).count
      render json: {like_count: @num_likes, error: "You must be signed in to like an idea", status: :unauthorized}
    end
  end

  def likeCount
    @idea = Idea.find(params[:id])
    @idea_likes = IdeaUsersLike.where(idea_id: @idea.id)
    @liked_by_user = false
    if(current_user)
      @liked_by_user = !@idea_likes.where(user_id: current_user.id).empty?
    end
    @num_likes = @idea_likes.count
    render json: {like_count: @num_likes, liked_by_user: @liked_by_user}
  end

 private
    def set_idea
      @idea = Idea.find(params[:id])
    end

    def idea_params
			params.require(:idea).permit(:name, :description)
    end
end
