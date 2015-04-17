class User < ActiveRecord::Base
  attr_accessible :email, :password, :password_confirmation, :avatar

  has_many :user_ideas
  has_many :ideas, through: :user_ideas
  has_many :repositories
  has_many :comments 

  has_attached_file :avatar, 
		    :styles => { :medium => "300x300>", :thumb => "100x100#" },
		    :url => "/images/:id/:style/:basename\.:extension",
    		    :path => ":rails_root/public/images/:id/:style/:basename\.:extension"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable

  include DeviseTokenAuth::Concerns::User
end
