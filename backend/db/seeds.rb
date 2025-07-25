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