class ResourceComment < ActiveRecord::Base
	attr_accessible :comment_id, :resource_path
	has_many :comments
	
	validates :comment_id, :resource_path, presence: true
	validates :resource_path, presence: true
end
