class RemoveCoverImageFromIdeas < ActiveRecord::Migration
  def change
		remove_column :ideas, :cover_img
  end
end
