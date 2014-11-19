class AddParentIdToDirectoryTable < ActiveRecord::Migration
  def change
		add_column :directories, :parent_id, :integer
  end
end
