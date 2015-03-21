class PullRequest < ActiveRecord::Base
	attr_accessible :repository_id
	belongs_to :repository, :foreign_key => 'repository_id'
	
	##VALIDATION
	validates :repository_id, :presence => true
end