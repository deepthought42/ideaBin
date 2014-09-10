class AddCoverImgToIdeas < ActiveRecord::Migration
  def change
    add_column :ideas, :cover_img, :string
  end
end
