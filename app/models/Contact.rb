class Contact < ActiveRecord::Base
	attr_accessible :comment
		
	validates :fname, presence: true
	validates :lname, presence: true
	validates :email, presence: true
	validates :reason, presence: true
	validates :message, presence: true
end