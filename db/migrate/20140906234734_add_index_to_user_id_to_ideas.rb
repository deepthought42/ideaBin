class AddIndexToUserIdToIdeas < ActiveRecord::Migration
  def change
    add_column :ideas, :user_id, :integer
    add_index :ideas, :user_id
  end
end
