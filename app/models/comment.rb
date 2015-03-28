class Comment < ActiveRecord::Base
	attr_accessible :comment
	belongs_to :user
	belongs_to :resource_comment, :class_name => ResourceComment
	has_one :repository, through: :repository_comment
	
	validates :comment, presence: true
end
