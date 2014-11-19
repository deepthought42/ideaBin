class DropAncestryColumn < ActiveRecord::Migration
  def change
		remove_column :directories, :ancestry
  end
end
