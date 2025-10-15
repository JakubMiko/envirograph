class AddUserIdToSeries < ActiveRecord::Migration[8.0]
  def change
    add_column :series, :user_id, :bigint, null: false
    add_foreign_key :series, :users
    add_index :series, :user_id
  end
end
