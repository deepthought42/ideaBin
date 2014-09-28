class Resource < ActiveRecord::Base
  attr_accessible :comment
  #has_attached_file :attachment
  belongs_to :idea
  validates :comment, :presence => true
end
