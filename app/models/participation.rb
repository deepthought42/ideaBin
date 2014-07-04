class Participation < ActiveRecord::Base
  attr_accessible :admin, :created_at, :idea_id, :owner, :user_id
  belongs_to :user
  belongs_to :idea
end
