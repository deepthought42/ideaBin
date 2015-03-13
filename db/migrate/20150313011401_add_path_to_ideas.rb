class AddPathToIdeas < ActiveRecord::Migration
  def change
		add_column :ideas, :path,	:string
  end
end
