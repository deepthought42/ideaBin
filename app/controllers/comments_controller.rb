class CommentsController < ApplicationController
  before_filter :authenticate_user!, except: [:index]
	#before_action :set_idea, except: [:new, :create, :index, :]

	respond_to :json
	
	
  # GET /comments/1.json
  def show
		@comment = Comment.find(params[:id])
		
		respond_with(@comment)
  end
	
	
	#creates a new comment with the given message
	#
  # POST /comments.json
  def create
		@comment = Comment.new
		@comment.comment = params[:message] 
		@comment.user = current_user
		
		@comment.save
		respond_with(@comment)
  end
	
	private
    def set_comment
      @comment = Comment.find(params[:id])
    end

    def comment_params
			params.require(:comment).permit(:message, :created_at)
    end
end
