class CreateRepositoryComments < ActiveRecord::Migration
  def change
    create_table :repository_comments do |t|
			t.integer :repository_id
			t.integer :comment_id
			t.timestamps
    end
		
		add_index :repository_comments, [:repository_id, :comment_id]
  end
end
