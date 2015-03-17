class CreateUserIdeas < ActiveRecord::Migration
  def change
    create_table :user_ideas do |t|

      t.timestamps
    end
  end
end
