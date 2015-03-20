class AddPathToIdeasUsers < ActiveRecord::Migration
  def change
		add_column :ideas_users, :repo_path, :string
  end
end
