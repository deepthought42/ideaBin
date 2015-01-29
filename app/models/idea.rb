class Idea < ActiveRecord::Base
  attr_accessible :description, :name, :cover_img
  belongs_to :user, :class_name => 'Idea', :foreign_key => 'user_id'
  has_many   :resources
end
