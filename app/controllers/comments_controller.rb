class CommentsController < ApplicationController

	#creates a new comment with the given message
	#
  # POST /comments.json
  def create
		@comment = Comment.new
		@comment.message = params[:message] 
		@comment.user = current_user
		
		@comment.save
		respond_with(@comment)
  end
end
