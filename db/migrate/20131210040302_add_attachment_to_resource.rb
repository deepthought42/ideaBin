class AddAttachmentToResource < ActiveRecord::Migration
  def change
    add_column :resources, :attachment_file_name,    :string
    add_column :resources, :attachment_content_type, :string
    add_column :resources, :attachment_file_size,    :integer
    add_column :resources, :attachment_updated_at,   :datetime
  end
end
