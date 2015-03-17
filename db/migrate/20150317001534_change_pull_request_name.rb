class ChangePullRequestName < ActiveRecord::Migration
  def change
		rename_table :pullRequests, :pull_requests
  end
end
