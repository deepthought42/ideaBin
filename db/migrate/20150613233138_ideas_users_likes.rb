class IdeasUsersLikes < ActiveRecord::Migration
  def change
    create_table :ideas_users_likes do |t|
      t.integer :idea_id
      t.integer :user_id
    end
  end
end
