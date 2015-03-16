class CreateIdeas < ActiveRecord::Migration
  def change
    create_table :ideas do |t|
      t.string :name					:null => false
      t.string :description

      t.timestamps
    end
  end
end
