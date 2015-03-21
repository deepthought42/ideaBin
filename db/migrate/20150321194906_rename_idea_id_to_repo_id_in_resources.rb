class RenameIdeaIdToRepoIdInResources < ActiveRecord::Migration
  def change
		rename_column :resources, :idea_id, :repo_id
  end
end
