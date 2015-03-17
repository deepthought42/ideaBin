class DropPullRequestsTable < ActiveRecord::Migration
  def change
		drop_table :pull_requests
  end
end
