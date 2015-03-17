class PullRequestController < ApplicationController
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
    @pullRequest = pullRequest.new()
    @pullRequest.user_id = current_user.id
		@pullRequest.idea_id = params[:idea_id]
		
		respond_with(@pullRequest)
  end

  # PUT /pullRequests/1
  # PUT /pullRequests/1.json
  def update
    @pullRequest = pullRequest.find(params[:id])
	
    if @pullRequest.save
			respond_with(@pullRequest)
		else
			respond_with(error:	"An error occurred while updating your pull request")
    end
  end
end
