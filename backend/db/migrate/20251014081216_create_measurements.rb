class CreateMeasurements < ActiveRecord::Migration[8.0]
  def change
    create_table :measurements do |t|
      t.references :series, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.datetime :measured_at, null: false
      t.float :temperature_c
      t.float :bod_mg_L
      t.float :tss_mg_L
      t.float :do_mg_L
      t.float :conductivity_us_cm
      t.float :swqi
      t.timestamps
    end
  end
end
