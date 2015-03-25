class CreateRepositoryCommentsTable < ActiveRecord::Migration
  def change
    create_table :repository_comments do |t|
			t.integer :comment_id
			t.integer :repo_id
			t.timestamps			
    end
		
		add_index :repository_comments, [:comment_id, :repo_id]
  end
end
