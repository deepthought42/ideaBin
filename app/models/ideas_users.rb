class IdeasUsers < ActiveRecord::Base
	attr_accessible :user_id, :idea_id, :parent_id, :pull_request_id
	belongs_to :user
	belongs_to :idea
	has_one :pull_request
end
