class Idea < ActiveRecord::Base
  attr_accessible :cover_img, :cover_img_file_name, :description, :name
  belongs_to :user, :foreign_key => 'user_id'
  has_many   :resources
  has_many 	 :repositories
  has_many   :idea_users_likes
  #has_many 	 :users, through: :repositories

  has_attached_file :cover_img, :styles => { :medium => "300x300>", :thumb => "100x100>" },
		    :url => "/images/ideas/:id/:style/:basename\.:extension",
    		    :path => ":rails_root/public/images/ideas/:id/:style/:basename\.:extension"
  validates_attachment :cover_img, content_type: { content_type: ["image/jpeg", "image/jpg", "image/png", "image/gif"] }

  validates :name, :presence => true
  validate :uniqueness_of_name

  def uniqueness_of_name
    existing_record = Idea.find_by_name(name)
    unless existing_record.nil?
      errors.add(:name, "Idea name already exists")
    end
  end
end
