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