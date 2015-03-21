class AddIndexForRepoIdAndToRepoIdToPullRequestsTable < ActiveRecord::Migration
  def change
		remove_index :pull_requests, :repository_id
		add_index :pull_requests, :repository_id
		add_index :pull_requests, :to_repo_id
  end
end
