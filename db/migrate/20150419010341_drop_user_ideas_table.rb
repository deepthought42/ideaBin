class DropUserIdeasTable < ActiveRecord::Migration
  def change
		drop_table :user_ideas
  end
end
