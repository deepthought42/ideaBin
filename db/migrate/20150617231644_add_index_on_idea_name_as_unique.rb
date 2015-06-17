class AddIndexOnIdeaNameAsUnique < ActiveRecord::Migration
  def change
    enable_extension 'citext'
    change_column :ideas, :name, :citext
    add_index :ideas, :name, :unique => true
  end
end
