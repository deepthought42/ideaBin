class PullRequest < ActiveRecord::Base
	attr_accessible :repository_id
	belongs_to :repository, :foreign_key => 'repository_id'
	belongs_to :source_repo, class_name: 'Repository', :foreign_key => 'to_repo_id'
	##VALIDATION
	validates :repository_id, :presence => true
end