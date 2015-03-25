class RepositoryComment < ActiveRecord::Base
	attr_accessible :comment_id, :repository_id, :created_at
	belongs_to :user
	
	has_many :repository_comments
	has_many :comments, through: repository_comments
end