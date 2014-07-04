class Idea < ActiveRecord::Base
  attr_accessible :description, :name
  has_many :participations
  has_many :participants, :through => :participations
end
