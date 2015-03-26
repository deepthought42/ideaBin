class ResourceCommentsController < ApplicationController
	#creates a new comment with the given message
	#
  # POST /repository_comments.json
  def create
		@comment = Comment.new()
		@comment.comment = params[:message] 
		@comment.user = current_user
		@comment.save
		
		@resource_comment = ResourceComment.new()
		@resource_comment.resource_path = params[:path]
		@resource_comment.comment_id = @comment.id
		@resource_comment.save
		if(@resource_comment)
			respond_with(@comment)
		else
			render json: {error: "something went wrong while creating resource comment"}
		end
  end
end
