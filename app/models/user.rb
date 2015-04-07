class User < ActiveRecord::Base

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
	
	
	
  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :avatar
	
	has_attached_file :avatar, :styles => { :medium => "300x300#", :thumb => "100x100#" }, :default_url => "/images/:style/missing.png", :default_style => :thumb
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/
  # attr_accessible :title, :body
  has_many :repositories
	has_many :ideas, through: :repositories
	has_many :comments
end
