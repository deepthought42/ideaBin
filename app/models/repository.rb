class Repository < ActiveRecord::Base
  attr_accessible :idea_id, :user_id, :path
  belongs_to :user
	belongs_to :idea
	validates :path, :presence => true
end
