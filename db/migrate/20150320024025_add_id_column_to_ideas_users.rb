class AddIdColumnToIdeasUsers < ActiveRecord::Migration
  def change
		add_column :ideas_users, :id, :primary_key
  end
end
