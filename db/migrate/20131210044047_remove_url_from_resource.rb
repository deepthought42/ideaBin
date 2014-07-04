class RemoveUrlFromResource < ActiveRecord::Migration
  def up
	remove_column :resources, :url
  end

  def down
	add_column :url
  end
end
