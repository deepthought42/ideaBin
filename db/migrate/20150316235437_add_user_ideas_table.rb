class AddUserIdeasTable < ActiveRecord::Migration
  def change
		create_join_table :users, :ideas do |t|
			t.index :user_id
			t.index :idea_id
			t.integer :parent_id
			t.boolean :pull_request_id
		end
  end
end
