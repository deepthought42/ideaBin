class AddIdeaIdToDirectories < ActiveRecord::Migration
  def change
		add_column 	:directories, :idea_id, :integer
		add_index		:directories, :idea_id
  end
end
