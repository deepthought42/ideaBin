class AddAttachmentCoverImgToIdeas < ActiveRecord::Migration
  def self.up
    change_table :ideas do |t|
      t.attachment :cover_img
    end
  end

  def self.down
    remove_attachment :ideas, :cover_img
  end
end
