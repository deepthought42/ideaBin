class RemoveUserIdAndAddToPathToRepositories < ActiveRecord::Migration
  def change
		remove_column :repositories, :user_id
		add_column	:repositories, :to_path, :string
  end
end
