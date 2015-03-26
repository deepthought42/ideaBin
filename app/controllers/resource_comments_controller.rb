class ResourceCommentsController < ApplicationController
	#creates a new comment with the given message
	#
  # POST /repository_comments.json
  def create
		@comment = Comment.new()
		@comment.comment = params[:message] 
		@comment.user = current_user
		#@comment.save
		
		@resource_comment = ResourceComment.new()
		@resource_comment.resource_path = params[:resource_path]
		@resource_comment.comments << @comment
		@resource_comment.save
		
		respond_with(@comment)
  end
end
