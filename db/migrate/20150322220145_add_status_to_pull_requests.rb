class AddStatusToPullRequests < ActiveRecord::Migration
  def change
		add_column :pull_requests, :status, :string, null: false, default: 'SUBMITTED'
  end
end
