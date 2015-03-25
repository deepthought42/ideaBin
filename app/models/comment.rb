class Comment < ActiveRecord::Base
	attr_accessible :comment
	belongs_to :user
	
	validates :comment, presence: true
end
