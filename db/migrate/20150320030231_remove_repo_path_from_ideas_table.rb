class RemoveRepoPathFromIdeasTable < ActiveRecord::Migration
  def change
		remove_column :ideas, :path
  end
end
