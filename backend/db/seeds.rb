User.create!(
    first_name: "Regular",
    last_name: "Ruser",
    email: "regular@gmail.com",
    password: "password",
    password_confirmation: "password",
    admin: false
)

User.create!(
    first_name: "Admin",
    last_name: "Auser",
    email: "admin@gmail.com",
    password: "password",
    password_confirmation: "password",
    admin: true
)

Series.create!(
    name: "Warsaw",
    min_swqi: 0,
    max_swqi: 100,
    color: "orange",
    user_id: 1
)

Series.create!(
    name: "Bialystok",
    min_swqi: 25,
    max_swqi: 85,
    color: "green",
    user_id: 2
)

Measurement.create!(
  series_id: 1,
  user_id: 2,
  measured_at: Time.now - 3.days,
  temperature_c: 20.5,
  bod_mg_L: 8.2,
  tss_mg_L: 45.0,
  do_mg_L: 9.1,
  conductivity_us_cm: 1200,
  swqi: 75.0
)

Measurement.create!(
  series_id: 1,
  user_id: 2,
  measured_at: Time.now - 2.days,
  temperature_c: 21.0,
  bod_mg_L: 7.5,
  tss_mg_L: 40.0,
  do_mg_L: 8.8,
  conductivity_us_cm: 1180,
  swqi: 78.0
)

Measurement.create!(
  series_id: 2,
  user_id: 2,
  measured_at: Time.now - 1.day,
  temperature_c: 18.0,
  bod_mg_L: 10.0,
  tss_mg_L: 60.0,
  do_mg_L: 7.5,
  conductivity_us_cm: 1300,
  swqi: 65.0
)

Measurement.create!(
  series_id: 2,
  user_id: 2,
  measured_at: Time.now,
  temperature_c: 19.5,
  bod_mg_L: 9.0,
  tss_mg_L: 55.0,
  do_mg_L: 8.0,
  conductivity_us_cm: 1250,
  swqi: 68.0
)
