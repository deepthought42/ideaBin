class AddUserIdBackToRepositoriesRemoveUserIdFromPullRequests < ActiveRecord::Migration
  def change
		add_column :repositories, :user_id, :integer
		remove_column :pull_requests, :user_id, :integer
  end
end
