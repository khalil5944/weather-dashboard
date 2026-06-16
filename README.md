# 🌤️ Weather Dashboard Pro

A weather dashboard built with Angular, Node.js, and PostgreSQL.

![Weather Dashboard](https://via.placeholder.com/1200x600/667eea/ffffff?text=Weather+Dashboard+Pro)

## ✨ Features

- **Real-time Weather Data** - Current conditions with dynamic icons
- **5-Day Forecast** - Detailed daily predictions
- **Temperature Charts** - Visual temperature trends
- **Search History** - Saved searches with click-to-reuse
- **Geolocation** - Auto-detects user's location
- **Premium UI/UX** - Glassmorphism design with smooth animations
- **Responsive Design** - Works on all devices
- **Professional Navigation** - Fixed navbar with scroll effects
- **API Security** - Backend proxy protecting API keys
- **PostgreSQL Database** - Persistent search history storage

## 🛠️ Tech Stack

### Frontend
- Angular 17+
- TypeScript
- Chart.js
- CSS3 (Glassmorphism, Animations)

### Backend
- Node.js
- Express
- PostgreSQL
- JWT Authentication

### APIs
- OpenWeatherMap API

## 📋 Prerequisites

- Node.js (v18+)
- PostgreSQL (v14+)
- Angular CLI
- OpenWeatherMap API Key

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/weather-dashboard-pro.git
cd weather-dashboard-pro

### 2. Backend Setup

cd backend
npm install
cp .env.example .env
# Edit .env with your database and API keys
npm run dev

### 3. Frontend Setup

cd frontend/weather-app
npm install
ng serve --open

### 4. Database Setup

psql -U postgres
CREATE DATABASE weather_db;
\c weather_db;
# Run the SQL schema from backend/schema.sql

### 📁 Project Structure
text
weather-dashboard/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── routes/
│   │   ├── weatherRoutes.js
│   │   ├── historyRoutes.js
│   │   └── authRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    └── weather-app/
        ├── src/
        │   ├── app/
        │   │   ├── components/
        │   │   ├── services/
        │   │   ├── app.component.ts
        │   │   └── app.component.html
        │   ├── styles.css
        │   └── main.ts
        ├── package.json
        └── angular.json
🔧 Environment Variables
Backend (.env)
PORT=5000
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=weather_db
OPENWEATHER_API_KEY=your_api_key

Frontend (.env)
API_URL=http://localhost:5000/api

### 🎯 API Endpoints
Method	    Endpoint	                Description
GET	        /api/weather/current/:city	Get current weather
GET	        /api/weather/forecast/:city	Get 5-day forecast
GET	        /api/history	            Get search history
DELETE	    /api/history/:id	        Delete history item
POST	    /api/auth/register	        User registration
POST	    /api/auth/login	User        login

### 👤 Author
Basdouri Med khalil
GitHub: https://github.com/khalil5944