class CreateParticipations < ActiveRecord::Migration
  def change
    create_table :participations do |t|
      t.integer :idea_id
      t.integer :user_id
      t.boolean :owner
      t.boolean :admin
      t.datetime :created_at

      t.timestamps
    end
  end
end
