class DropColumnParentIdFromIdeasUsersTable < ActiveRecord::Migration
  def change
		remove_column :ideas_users, :parent_id
  end
end
