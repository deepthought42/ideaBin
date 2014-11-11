class AddDirectoryIdToResources < ActiveRecord::Migration
  def change
		add_column :resources, :directory_id, :integer
    add_index :resources, :directory_id
  end
end
