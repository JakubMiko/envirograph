# envirograph

Extra functionalities that were implemented beyond project scope:
- Landing Page
- Enable admin users do delete series
- Series actions like Create/ Update/ Delete were performed using modal windows
- SWQI live calculator when entering Measurement data


## Environment variable: REACT_APP_API_URL

To ensure the frontend communicates correctly with the backend API (especially in production or cloud deployments), set the environment variable `REACT_APP_API_URL` in your deployment platform (e.g., Render, Vercel, Netlify).

**Purpose:**
- This variable defines the base URL for all API requests from the React frontend.
- It allows the frontend to dynamically target the correct backend address, regardless of environment (local development, staging, production, etc.).

**Usage example:**
```
REACT_APP_API_URL=https://your-backend-service.onrender.com
```

**Why is this needed?**
- The frontend uses a helper (`apiFetch`) to prepend this URL to all API calls, ensuring requests always go to the correct backend.
- Without this variable, the frontend may try to call a local or incorrect API endpoint, causing errors after deployment.

**Where to set:**
- In your deployment platform's environment variables/settings panel for the frontend/static site.
- Locally, you can add it to a `.env` file in the `frontend/` directory for development.