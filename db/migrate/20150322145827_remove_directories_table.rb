class RemoveDirectoriesTable < ActiveRecord::Migration
  def change
		drop_table :directories
  end
end
