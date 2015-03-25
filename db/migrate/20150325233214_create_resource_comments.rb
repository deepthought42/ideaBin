class CreateResourceComments < ActiveRecord::Migration
  def change
    create_table :resource_comments do |t|
			t.string :resource_path
			t.integer :comment_id
			t.timestamps
    end
		
		add_index :resource_comments, [:resource_path, :comment_id]
  end
end
