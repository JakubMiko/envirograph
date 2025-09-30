class CreateSeries < ActiveRecord::Migration[8.0]
  def change
    create_table :series do |t|
      t.string :name, null: false
      t.float :min_swqi
      t.float :max_swqi
      t.string :color
      t.timestamps
    end
  end
end
