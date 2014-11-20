class AddIsTopToDirectoriesTable < ActiveRecord::Migration
  def change
		add_column :directories, :is_top, :boolean
  end
end
