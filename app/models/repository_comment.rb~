class RepositoryComment < ActiveRecord::Base
  attr_accessible :comment_id, :repository_id, :created_at
  belongs_to :user
	
  belongs_to :repository
  belongs_to :comment

  validates :repository, :presence => true
  validates :comment, :presence => true
end
