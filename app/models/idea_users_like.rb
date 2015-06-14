class IdeaUsersLike < ActiveRecord::Base
  attr_accessible :idea_id, :user_id
  belongs_to :user
  belongs_to :idea

  validates :idea_id, :presence => true
  validates :user_id, :presence => true
end
