class RenameIdeasUsersToRepositories < ActiveRecord::Migration
  def change
		rename_table :ideas_users, :repositories
  end
end
