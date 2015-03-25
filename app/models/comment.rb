class Comment < ActiveRecord::Base
	attr_accessible :comment
	belongs_to :user
	has_one :repository, through: :repository_comment
	
	validates :comment, presence: true
end
