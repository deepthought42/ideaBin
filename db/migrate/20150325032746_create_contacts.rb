class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
			t.string :fname, null: false
			t.string :lname, null: false
			t.string :email, null: false
			t.string :reason, null: false
			t.string :message, null: false
			t.timestamps
    end
  end
end
