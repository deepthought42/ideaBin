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
    @pullRequests = PullRequest.where(to_repo_id: params[:repo_id]).where( status: "SUBMITTED")

    respond_with(@pullRequests)
  end

  # GET /pullRequests/1
  # GET /pullRequests/1.json
  def show
    @pullRequest = PullRequest.find(params[:id])
		respond_with(@pullRequest)
  end

	#
	# Gets the current count of PullRequests that have the given repo as the destination 
	# repository and a given status
	#
	# @param status - {"SUBMITTED","ACCEPTED","REJECTED"}
	#
  # GET /pullRequests/count
  # GET /pullRequests/count.json
  def count
    @pullRequest = PullRequest.where(to_repo_id: params[:repo_id]).where( status: params[:status]).count
		
    respond_to do |format|
      format.html # count.html.erb
      format.json { render json: @pullRequest }
    end
  end

	#
	# Looks for an existing pull request, if one doesn't exist a new one is created for the 
	# current repository to the idea owners repository
	#
  # POST /pullRequests
  # POST /pullRequests.json
  def create
	
	##first check that user doesn't already have a pull request open for this repo line
		@idea = Idea.find(params[:idea_id])
		@toRepo = Repository.where(user_id: @idea.user_id).where(idea_id: params[:idea_id]).first
		@repo = Repository.where(user_id: current_user.id).where(idea_id: params[:idea_id]).first
		
		
		@pull_request = PullRequest.where(to_repo_id: @toRepo.id).where(repository_id: @repo.id).where(status: "SUBMITTED").first
		
		unless @pull_request
	    @pullRequest = PullRequest.new()

			@pullRequest.repository_id = @repo.id
			@pullRequest.to_repo_id = @toRepo.id
			
			@pullRequest.message = params[:name]
			@pullRequest.save
			
			Dir.chdir(@repo.path)
			@git = Git.init()
			@git.pull(@toRepo.path, "master") # fetch and a merge
		end 
		if(@pullRequest)
			respond_to do |format|
				format.html # new.html.erb
				format.json { render json: @pullRequest }
			end
		else
			render json: {error: "Looks like something went wrong with creating a repo. Perhaps you already have one."}
		end
  end

  # PUT /pullRequests/1
  # PUT /pullRequests/1.json
	#update will be used for accepting a pull request which means pulling
	# the requesting repo into the parent repo
  def update
    @pullRequest = PullRequest.find(params[:id])
		@git = Git.init()
		Dir.chdir(@pullRequest.source_repo.path)
		requestor_path = "#{@pullRequest.repository.path}"
		@git.pull(requestor_path, "master") # fetch and a merge
		@pullRequest.status = "ACCEPTED"
    if @pullRequest.save
		respond_with(@pullRequest)
	else
		render json: {error: "An error occurred while updating your pull request"}
    end
  end
	
	#
	# Sets a pull-request as rejected
	#
	# DELETE /pullRequests/1
  # DELETE /pullRequests/1.json
	#
	# the requesting repo into the parent repo
  def destroy
    @pullRequest = PullRequest.find(params[:id])

		@pullRequest.status = "REJECTED"
    if @pullRequest.save
			respond_with(@pullRequest)
		else
			render json: {error: "An error occurred while rejecting the pull request"}
    end
  end
end
