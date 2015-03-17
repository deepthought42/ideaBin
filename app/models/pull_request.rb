class PullRequest < ActiveRecord::Base
	attr_accessible :user_id, :repository_id
	belongs_to :user, :class_name => 'PullRequest', :foreign_key => 'user_id'
	belongs_to :repository, :class_name => 'Repository', :foreign_key => 'repository_id'
	
	##VALIDATION
	validates :repository_id, :presence => true
end