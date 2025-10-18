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

series = [
  { name: "Vistula - Warsaw", min_swqi: 20, max_swqi: 90, color: "blue" },
  { name: "Odra - Wroclaw", min_swqi: 25, max_swqi: 85, color: "green" },
  { name: "Bug - Terespol", min_swqi: 30, max_swqi: 80, color: "orange" },
  { name: "Warta - Poznan", min_swqi: 15, max_swqi: 75, color: "purple" },
  { name: "San - Przemysl", min_swqi: 10, max_swqi: 70, color: "red" }
]

series_records = series.map do |s|
  Series.create!(s.merge(user_id: 2))
end

series_records.each_with_index do |serie, idx|
  3.times do |i|
    Measurement.create!(
      series_id: serie.id,
      user_id: 2,
      measured_at: Time.now - (3 - i).days,
      temperature_c: 18.0 + idx + i,
      bod_mg_L: 7.0 + i,
      tss_mg_L: 40.0 + idx * 2 + i,
      do_mg_L: 8.0 + i,
      conductivity_us_cm: 1200 + idx * 10 + i * 5,
      swqi: 60.0 + idx * 5 + i * 3
    )
  end
end
