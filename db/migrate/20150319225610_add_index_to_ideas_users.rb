class AddIndexToIdeasUsers < ActiveRecord::Migration
  def change
		add_index :ideas_users, [:user_id, :idea_id], :unique => true
  end
end
