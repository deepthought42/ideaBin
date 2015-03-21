class AddRepoForRequestToPullRequests < ActiveRecord::Migration
  def change
		remove_column	:repositories, :to_path, :string
		add_column :pull_requests, :to_repo_id, :integer
  end
end
