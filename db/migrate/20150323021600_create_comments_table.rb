class CreateCommentsTable < ActiveRecord::Migration
  def change
    create_table :comments do |t|
			t.string :comment, :null => false
			t.integer :user_id, :null => false
			t.timestamp
    end
		
		add_index :comments, :user_id
  end
end
