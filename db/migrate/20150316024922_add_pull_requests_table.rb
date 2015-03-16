class AddPullRequestsTable < ActiveRecord::Migration
  def change
		create_table :pullRequests do |t|
			t.integer 	:user_id, 				:null => false
			t.integer 	:repository_id, 	:null => false
			t.string		:message,				:null => false
			t.timestamp
		end
		
		add_index :pullRequests, :user_id, 				:unique => true
		add_index :pullRequests, :repository_id,	:unique => true
  end
end
