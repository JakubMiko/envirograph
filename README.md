# envirograph

## 1. What is this application and what is it for?

Envirograph is a calculator and visualization tool for water quality research.
It allows users to measure and analyze water quality using the Simple Water Quality Index and visualize measurement data on interactive charts.
The app is designed for quick assessment and presentation of water quality data.

---

## 2. Technology Stack

**Backend:**
- Ruby on Rails
- API exposed via Grape
- API documentation generated with Swagger
- Authentication and authorization with Devise
- Database management with ActiveRecord (PostgreSQL)

**Frontend:**
- React (JavaScript)
- HTML, CSS
- React Bootstrap, Bootstrap

---

## 3. How to install and run locally

### 1. Clone the repository

```bash
git clone https://github.com/JakubMiko/envirograph.git
cd envirograph
```

### 2. Setup backend (Ruby on Rails)

**Requirements:**
- Ruby (recommended: 3.3.5)
- Bundler (recommended 2.5.23)
- PostgreSQL (recommended 14.19)

**Install dependencies:**
```bash
cd backend
bundle install
```

**Configure the database:**
- Make sure your local PostgreSQL server is running.
- By default, Rails uses `backend_development` for development and `backend_test` for tests (see `backend/config/database.yml`).
- Create and migrate the database:
  ```bash
  rails db:create db:migrate db:seed
  ```

**Start the backend server:**
```bash
rails server
```
By default, the backend will be available at [http://localhost:3000](http://localhost:3000).

---

### 3. Setup frontend (React)

**Requirements:**
- Node.js (recommended: 14.23)
- npm (recommended: 6.14.18)

**Install dependencies:**
```bash
cd frontend
npm install
```

**Start the frontend:**
```bash
npm start
```
The frontend will be available at [http://localhost:3001](http://localhost:3001).

**Note:**
If you want to host the frontend separately (e.g. on Render, Vercel, Netlify), you need to set the environment variable `REACT_APP_API_URL` to point to your backend API address.
Locally, this variable is not required unless you run backend and frontend on different hosts/ports.

Example for deployment:
```
REACT_APP_API_URL=https://your-backend-service.onrender.com
```

---

## 4. Try the hosted application

You can try the app live here:
[https://envirograph-1.onrender.com/](https://envirograph-1.onrender.com/)

If you want to test admin features, feel free to contact me for access – I will provide you with an admin account for testing purposes.

**Contact:** jakub.mikolajczyk.dev@gmail.com