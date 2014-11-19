class AddLocationToDirectories < ActiveRecord::Migration
  def change
		add_column :directories, :path, :string
  end
end
