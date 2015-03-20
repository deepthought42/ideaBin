class Repository < ActiveRecord::Base
  attr_accessible :idea_id, :user_id, :repo_path
  belongs_to :user
	belongs_to :idea
	validates :repo_path, :presence => true
end
