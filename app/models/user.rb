class User < ActiveRecord::Base


  attr_accessible :email, :password, :password_confirmation

  before_create :skip_confirmation!
 # before_validation :set_provider


  has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100#" }
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable

  include DeviseTokenAuth::Concerns::User
	private

	def set_provider
#	  self.provider = "email"
	end
end
