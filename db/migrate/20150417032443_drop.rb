class Drop < ActiveRecord::Migration
  def change
    drop_resources :table
  end
end
