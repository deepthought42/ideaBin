class User < ActiveRecord::Base
  include DeviseTokenAuth::Concerns::User
  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me  
  
  # Include default devise modules. Others available are:
# :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable, :omniauthable
	
	
	

	
  has_attached_file :avatar 
    do_not_validate_attachment_file_type :avatar
  
#validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/
  #validates_attachment_content_type :avatar, content_type: "image/jpeg", "image/jpg", "image/png", "image/gif"
  has_many :repositories
  has_many :ideas, through: :repositories
  has_many :comments
end
