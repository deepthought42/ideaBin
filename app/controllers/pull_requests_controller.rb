class PullRequestsController < ApplicationController
	before_filter :authenticate_user!
	respond_to :json
	
	# GET /myPullRequests
  # GET /myPullRequests.json
  def myPullRequests
    @pullRequests = PullRequest.where(user_id: current_user.id)
    respond_with(@pullRequests)
  end
	
  # GET /pullRequests
  # GET /pullRequests.json
  def index
		#should only grab pullRequests for current repository
    @pullRequests = PullRequest.where(repository_id: params[:repo_id])

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
    @pullRequest = PullRequest.new
		
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @pullRequest }
    end
  end

  # POST /pullRequests
  # POST /pullRequests.json
  def create
    @pullRequest = PullRequest.new()
		@idea = Idea.find(params[:idea_id])
		@repo = Repository.where(user_id: current_user.id).where(idea_id: params[:idea_id]).first
		
		#needs to be changed to use the repository id as soon as repos are set up
		###############################################################################
		#need the user idea for the specific repo to make request from and repo to make request the
		########################################################
		@pullRequest.repository_id = @repo.id
		@toRepo = Repository.where(user_id: @idea.user_id).where(idea_id: params[:idea_id]).first
		@pullRequest.to_repo_id = @toRepo.id
		
		@pullRequest.message = params[:name]
		@pullRequest.save
		respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @pullRequest }
    end
  end

  # PUT /pullRequests/1
  # PUT /pullRequests/1.json
	#update will be used for accepting a pull request
  def update
    @pullRequest = PullRequest.find(params[:id])
		@git = Git.init()
		g.pull("${idea.path}.git", master) # fetch and a merge

    if @pullRequest.save
			respond_with(@pullRequest)
		else
			respond_with(error:	"An error occurred while updating your pull request")
    end
  end
end
