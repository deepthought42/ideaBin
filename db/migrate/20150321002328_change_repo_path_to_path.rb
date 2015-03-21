class ChangeRepoPathToPath < ActiveRecord::Migration
  def change
		rename_column :repositories, :repo_path, :path
  end
end
