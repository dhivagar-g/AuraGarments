# AuraGarments

AuraGarments is a clothing-store application with a React frontend, an Express API backed by MySQL, and a separate FastAPI example backend.

## Features

- Product listing and product details (Express REST API)
- JWT authentication with bcrypt password hashing
- Cart with quantity updates and totals
- Product add / edit / delete

## Roadmap

- Migrate database to MongoDB (Mongoose)
- Admin role, orders and checkout
- FastAPI search, filter and sales report service
- Docker, GitHub Actions CI/CD, Azure deployment

## Project structure

- `frontend/` - React application
- `backend/` - Express API for authentication and product management
- `fastapi_backend/` - FastAPI example API

The React application currently calls the Express API at `http://localhost:5000`. The FastAPI backend is separate and is not used by the frontend.

## Prerequisites

- Node.js and npm
- Python 3
- MySQL

## Run the application

### Express API

From the project root, copy `.env.example` to `.env` and set `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, and `JWT_SECRET` to match your local setup. The MySQL database must include the `users` and `products` tables used by the API.

In PowerShell:

```powershell
Copy-Item .env.example .env
cd backend
npm install
node server.js
```

The API listens on port `5000` by default.

### React frontend

In a second terminal:

```powershell
cd frontend
npm install
npm start
```

The development server opens the frontend at `http://localhost:3000`.

### FastAPI backend

In another terminal:

```powershell
cd fastapi_backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

The FastAPI server runs at `http://localhost:8000`. Interactive API documentation is available at `http://localhost:8000/docs`.
