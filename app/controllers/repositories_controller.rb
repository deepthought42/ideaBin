class RepositoriesController < ApplicationController
  # GET /ideas
  # GET /ideas.json
  def index
    @repositories = Repository.where(idea_id: params[:id]).first

    respond_with(@ideas)
  end
	
	#
	def show
    @repo = Repository.where(idea_id: params[:id]).where(user_id: params[:user_id]).first
		
		respond_with(@repo)
  end
end
