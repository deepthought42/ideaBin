class PullRequestsController < ApplicationController
	before_filter :authenticate_user!
	respond_to :json
	
	# GET /myPullRequests
  # GET /myPullRequests.json
  def myPullRequests
    @pullRequests = PullRequest.where(user_id: current_user.id)
    respond_with(@pullRequests)
  end
	
	# GET /myRepositoryPullRequests
  # GET /myRepositoryPullRequests.json
  def myRepositoryPullRequests
    @pullRequests = PullRequest.where(user_id: current_user.id, repository_id: params[:repo_id])
    respond_with(@pullRequests)
  end
	
  # GET /PullRequests
  # GET /PullRequests.json
  def index
    @pullRequests = PullRequest.all

    respond_with(@pullRequests)
  end

  # GET /pullRequests/1
  # GET /pullRequests/1.json
  def show
    @pullRequest = PullRequest.find(params[:id])
		respond_with(@pullRequest)
  end

  # GET /pullRequests/new
  # GET /pullRequests/new.json
  def new
    @pullRequest = pullRequest.new
		
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @pullRequest }
    end
  end

  # POST /pullRequests
  # POST /pullRequests.json
  def create
    @pullRequest = PullRequest.new()
    @pullRequest.user_id = current_user.id
		#needs to be changed to use the repository id as soon as repos are set up
		@ideasUser = IdeasUsers.find(idea_id: params[:idea_id], current_user: current_user.id)
		@pullRequest.repository_id = @ideasUser.id
		
		@pullRequest.message = params[:name]
		@pullRequest.save
  end

  # PUT /pullRequests/1
  # PUT /pullRequests/1.json
	#update will be used for accepting a pull request
  def update
    @pullRequest = PullRequest.find(params[:id])
		@git = Git.init()
		g.remote(name).merge(branch2)
		
    if @pullRequest.save
			respond_with(@pullRequest)
		else
			respond_with(error:	"An error occurred while updating your pull request")
    end
  end
end
