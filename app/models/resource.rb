class Resource < ActiveRecord::Base
  attr_accessible :comment, :attachment
  has_attached_file :attachment
  validates :comment, :attachment, :presence => true
end
