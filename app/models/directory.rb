class Directory < ActiveRecord::Base
  has_many :resources
	belongs_to :parent, :class_name => "Directory"
	has_many :folders, :foreign_key => "parent_id"
end
