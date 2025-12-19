🛡️ Smart Incident Platform

A full-stack web application for reporting and managing security or operational incidents, built using Django REST Framework and React.js, with JWT-based authentication and role-based access (Admin & User).

🚀 Features
🔐 Authentication

Secure login using JWT (JSON Web Tokens)

Role-based access control:

Users: Report and manage their own incidents

Admins: View and manage all reported incidents

📋 Incident Management

Create incidents with:

Title

Description

Severity level (Low / Medium / High)

View incidents in a clean dashboard

Delete incidents

Admin view to see all users’ incidents

🎨 User Interface

Modern dark-themed UI

Responsive design

Clean dashboard layout

Visual severity indicators

Intuitive user experience

🧱 Tech Stack
Backend

Python

Django

Django REST Framework

Simple JWT

SQLite (development)

Frontend

React.js

JavaScript (ES6+)

CSS (Custom dark theme)

react-icons

Tools & Practices

Git & GitHub

REST APIs

Token-based authentication

Modular project structure

📁 Project Structure
smart-incident-platform/
│
├── backend/
│   ├── backend/          # Django project settings
│   ├── incidents/        # Incident app
│   ├── users/            # Custom user app
│   ├── manage.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── Login.js
│   │   ├── IncidentForm.js
│   │   ├── App.js
│   │   └── styles
│
├── requirements.txt
├── .gitignore
└── README.md

⚙️ Setup Instructions (Local Development)
🔹 Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver


Backend runs on:

http://localhost:8001

🔹 Frontend Setup
cd frontend
npm install
npm start


Frontend runs on:

http://localhost:3000

🧪 Usage

Register or create a superuser

Login using credentials

Create incidents from the dashboard

View incidents (user or admin view)

Manage incidents securely

🔒 Authentication Flow

User logs in → receives JWT access token

Token stored in browser storage

Token sent in API headers for protected routes

Backend validates token before allowing access

🌱 Future Improvements

Incident update/edit functionality

Pagination & filtering

Email notifications

Deployment with Docker

Production database (PostgreSQL)

👩‍💻 Author

Riddhi Katkar
GitHub: https://github.com/RiddhiKatkar

⭐ Acknowledgements

Django REST Framework documentation

React official docs

JWT authentication standards
