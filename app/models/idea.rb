class Idea < ActiveRecord::Base
  attr_accessible :cover_img_file_name, :description, :name
  belongs_to :user, :class_name => 'Idea', :foreign_key => 'user_id'
  has_many   :resources
	has_and_belongs_to_many :users, join_table: :ideas_users
	has_attached_file :cover_img
	validates_attachment :cover_img, content_type: { content_type: ["image/jpeg", "image/jpeg", "image/png", "image/gif"] }
	validates :name, :presence => true
end
