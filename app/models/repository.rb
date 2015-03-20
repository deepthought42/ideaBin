class Repository < ActiveRecord::Base
  attr_accessible :idea_id, :user_id, :repo_path
  belongs_to :user, :foreign_key => 'user_id'
	belongs_to :idea, :foreign_key => 'idea_id'
	validates :repo_path, :presence => true
end
