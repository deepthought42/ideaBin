class ChangeResourcesColumnNames < ActiveRecord::Migration
  def change
    rename_column :resources, :attachment_file_name, :filename
    rename_column :resources, :attachment_content_type, :content_type
    remove_column  :resources, :attachment_file_size
    remove_column :resources, :attachment_updated_at
  end
end
