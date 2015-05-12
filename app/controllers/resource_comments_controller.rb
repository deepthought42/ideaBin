class ResourceCommentsController < ApplicationController
		# GET /resource_comments.json
  def index
    @resource_comments = ResourceComment.where(resource_path: params[:path])
		comment_ids = []
		@resource_comments.each do |res|
			comment_ids << res.comment_id
		end
		@comments = Comment.where(id: comment_ids)
		render json: @comments
  end
	
	# GET /comments/1.json
  def show
		@resource_comment = ResourceComment.find(params[:id])
		
		respond_with(@resource_comment)
  end
	
	#creates a new comment with the given comment
	#
  # POST /repository_comments.json
  def create
		@comment = Comment.new()
		@comment.comment = params[:comment] 
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

  # PUT /resource_comment/1.json
  def update
		@comment = Comment.find(params[:id])
		@comment.comment = params[:comment]
		
    if @comment.save
			render json: @comment
		else
			render json: {error: "Failed to update comment"}, status: :unprocessable_entity
    end
  end
end
