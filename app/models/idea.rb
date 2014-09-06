class Idea < ActiveRecord::Base
  attr_accessible :description, :name
  belongs_to :user, :class_name => 'Idea', :foreign_key => 'user_id'
end
