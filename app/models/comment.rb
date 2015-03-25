class Comment < ActiveRecord::Base
	attr_accessible :comment
	belongs_to :user
	belongs_to :repository_comments
	delegate :repository, to: :repository_comments
	validates :comment, presence: true
end
