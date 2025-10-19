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

measurements_data = [
  # Vistula - Warsaw (increasing trend)
  [
    { temperature_c: 1.0, bod_mg_L: 2.0, tss_mg_L: 20.0, do_mg_L: 6.0, conductivity_us_cm: 10.50 },
    { temperature_c: 1.5, bod_mg_L: 2.5, tss_mg_L: 22.0, do_mg_L: 6.5, conductivity_us_cm: 10.60 },
    { temperature_c: 1.3, bod_mg_L: 3.0, tss_mg_L: 24.0, do_mg_L: 7.0, conductivity_us_cm: 10.70 },
    { temperature_c: 1.5, bod_mg_L: 3.5, tss_mg_L: 26.0, do_mg_L: 7.5, conductivity_us_cm: 10.80 },
    { temperature_c: 1.4, bod_mg_L: 4.0, tss_mg_L: 28.0, do_mg_L: 8.0, conductivity_us_cm: 10.90 }
  ],
  # Odra - Wroclaw (fluctuating trend)
  [
    { temperature_c: 1.0, bod_mg_L: 3.0, tss_mg_L: 25.0, do_mg_L: 7.0, conductivity_us_cm: 11.00 },
    { temperature_c: 1.2, bod_mg_L: 2.0, tss_mg_L: 30.0, do_mg_L: 6.0, conductivity_us_cm: 11.20 },
    { temperature_c: 1.0, bod_mg_L: 4.0, tss_mg_L: 22.0, do_mg_L: 8.0, conductivity_us_cm: 10.80 },
    { temperature_c: 1.5, bod_mg_L: 2.5, tss_mg_L: 28.0, do_mg_L: 7.5, conductivity_us_cm: 1.110 },
    { temperature_c: 1.5, bod_mg_L: 3.5, tss_mg_L: 24.0, do_mg_L: 6.5, conductivity_us_cm: 10.90 }
  ],
  # Bug - Terespol (decreasing trend)
  [
    { temperature_c: 1.3, bod_mg_L: 4.0, tss_mg_L: 35.0, do_mg_L: 9.0, conductivity_us_cm: 1.200 },
    { temperature_c: 1.0, bod_mg_L: 3.5, tss_mg_L: 33.0, do_mg_L: 8.5, conductivity_us_cm: 1.190 },
    { temperature_c: 1.4, bod_mg_L: 3.0, tss_mg_L: 31.0, do_mg_L: 8.0, conductivity_us_cm: 1.180 },
    { temperature_c: 1.0, bod_mg_L: 2.5, tss_mg_L: 29.0, do_mg_L: 7.5, conductivity_us_cm: 11.70 },
    { temperature_c: 1.6, bod_mg_L: 2.0, tss_mg_L: 27.0, do_mg_L: 7.0, conductivity_us_cm: 11.60 }
  ],
  # Warta - Poznan (irregular trend)
  [
    { temperature_c: 1.2, bod_mg_L: 2.0, tss_mg_L: 30.0, do_mg_L: 7.0, conductivity_us_cm: 11.00 },
    { temperature_c: 1.0, bod_mg_L: 3.5, tss_mg_L: 28.0, do_mg_L: 8.0, conductivity_us_cm: 1.120 },
    { temperature_c: 1.3, bod_mg_L: 2.5, tss_mg_L: 32.0, do_mg_L: 6.5, conductivity_us_cm: 10.80 },
    { temperature_c: 1.0, bod_mg_L: 3.0, tss_mg_L: 29.0, do_mg_L: 7.5, conductivity_us_cm: 1.110 },
    { temperature_c: 1.4, bod_mg_L: 2.8, tss_mg_L: 31.0, do_mg_L: 7.2, conductivity_us_cm: 10.95 }
  ],
  # San - Przemysl (increasing trend)
  [
    { temperature_c: 1.0, bod_mg_L: 2.0, tss_mg_L: 18.0, do_mg_L: 5.0, conductivity_us_cm: 1.040 },
    { temperature_c: 1.5, bod_mg_L: 2.5, tss_mg_L: 20.0, do_mg_L: 5.5, conductivity_us_cm: 10.55 },
    { temperature_c: 1.0, bod_mg_L: 3.0, tss_mg_L: 22.0, do_mg_L: 6.0, conductivity_us_cm: 1.070 },
    { temperature_c: 1.5, bod_mg_L: 3.5, tss_mg_L: 24.0, do_mg_L: 6.5, conductivity_us_cm: 10.85 },
    { temperature_c: 1.0, bod_mg_L: 4.0, tss_mg_L: 26.0, do_mg_L: 7.0, conductivity_us_cm: 1.100 }
  ]
]

series_records.each_with_index do |serie, idx|
  measurements_data[idx].each_with_index do |m, i|
    measured_at = Time.now - ((measurements_data[idx].size - i) * 2).days
    swqi = m[:temperature_c] * (m[:bod_mg_L] + m[:tss_mg_L] + m[:do_mg_L] + m[:conductivity_us_cm])
    Measurement.create!(
      series_id: serie.id,
      user_id: 2,
      measured_at: measured_at,
      temperature_c: m[:temperature_c],
      bod_mg_L: m[:bod_mg_L],
      tss_mg_L: m[:tss_mg_L],
      do_mg_L: m[:do_mg_L],
      conductivity_us_cm: m[:conductivity_us_cm],
      swqi: swqi.round(2)
    )
  end
end
