class Repository < ActiveRecord::Base
  attr_accessible :idea_id, :user_id, :path
  belongs_to :user
  belongs_to :idea
	
  has_many :repository_comments
  has_many :comments, through: :repository_comments
	
  validates :path, :presence => true
  validates :idea_id, :presence => true
  validates :user_id, :presence => true

end
