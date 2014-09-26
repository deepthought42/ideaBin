class AddIdeaIndexToResources < ActiveRecord::Migration
  def change
    add_column :resources, :idea_id, :integer
    add_index :resources, :idea_id
  end
end
