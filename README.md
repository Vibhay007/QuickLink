# 🚀 QuickLink

QuickLink is a full-stack URL shortener that allows users to create, manage, and track shortened links with real-time analytics. Built with the MERN stack, it features a complete click analytics pipeline tracking device, browser, country, and referrer data per click event.

---

## ✨ Highlights

* Full-stack MERN application
* Firebase Google Authentication
* JWT-based Authorization
* Real-time Click Analytics Pipeline (5 dimensions per event)
* Interactive Charts Dashboard (Recharts)
* QR Code Generation
* Custom Alias Support
* Non-blocking Redirect Architecture (< 150ms response time)
* Responsive UI
* RESTful API Architecture
* MongoDB Atlas Integration

---

## 🌟 Features

### 🔐 Authentication & Security
* User Registration & Login
* Google Sign-In with Firebase
* JWT-based Authentication
* Protected Routes
* Secure Password Handling

### 🔗 URL Shortening
* Generate short URLs instantly
* Custom alias support with real-time availability check
* Fast redirect pipeline with < 150ms response time
* Indexed MongoDB lookups for optimal performance

### 📊 Click Analytics Pipeline
* Real-time click event tracking per URL
* **5 dimensions tracked per click:**
  * Device type (mobile, desktop, tablet)
  * Browser (Chrome, Safari, Brave, Firefox, Edge, and 10+ more)
  * Country (via IP geolocation)
  * Referrer source (Google, Twitter, LinkedIn, direct)
  * Timestamp (for time-series charts)
* Non-blocking background processing — redirect speed unaffected
* Accurate browser detection via `sec-ch-ua` header + UA string parsing
* Real user IP detection via `x-forwarded-for` header

### 📈 Analytics Dashboard
* Total clicks and total URLs overview
* Top performing links
* Per-URL granular insights:
  * Clicks distribution timeline (Area chart)
  * Device breakdown (Pie chart)
  * Top browsers (Bar chart)
  * Top countries (Bar chart)
  * Referrer sources (Pie chart)

### 📱 QR Code Generation
* Generate QR codes for every shortened URL
* Easy sharing across devices
* Download and use QR codes anywhere

### 👤 User Dashboard
* Manage all created links
* Delete links
* View analytics for each URL
* Organized and responsive interface

---

## 🛠️ Tech Stack

### Frontend
* React
* Vite
* React Router
* Recharts (analytics visualization)

### Backend
* Node.js
* Express.js
* ua-parser-js (browser/device detection)

### Database
* MongoDB Atlas
* Mongoose (indexed shortCode for fast lookups)

### Authentication
* Firebase Authentication
* JWT (JSON Web Tokens)

### Additional Libraries
* Axios
* bcryptjs
* dotenv
* Firebase
* QR Code Generator

---

## ⚡ Performance

| Metric | Value |
|--------|-------|
| Redirect response time | < 150ms |
| Click tracking | Non-blocking (background) |
| DB lookup | Indexed shortCode |
| Hosting | Vercel (frontend) + Render (backend) |

---

## 📂 Project Structure

```bash
QuickLink/
│
├── client/                  # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnalyticsCard.jsx   # Charts dashboard
│   │   │   ├── UrlCard.jsx         # URL management card
│   │   │   └── QRCode.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   └── services/
│   │       └── api.js
│
├── server/                  # Node.js Backend
│   ├── models/
│   │   ├── Url.js           # URL schema (indexed shortCode)
│   │   ├── Click.js         # Click event schema (5 dimensions)
│   │   └── User.js
│   ├── routes/
│   │   ├── urlRoutes.js
│   │   └── authRoutes.js
│   ├── controllers/
│   │   └── urlController.js
│   └── server.js            # Main server + redirect handler
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
BASE_URL=http://localhost:5000
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/Vibhay007/QuickLink.git
cd QuickLink
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

### Install Backend Dependencies

```bash
cd ../server
npm install
```

---

## ▶️ Running Locally

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5001`

---

## 🔬 How the Analytics Pipeline Works

```
User clicks short link
        ↓
Express server finds original URL in MongoDB (indexed lookup)
        ↓
Redirect sent immediately to user (< 150ms)
        ↓
Background processing begins (non-blocking):
  ├── Parse device + browser from User-Agent + sec-ch-ua
  ├── Read referrer from HTTP headers
  ├── Geolocate country from x-forwarded-for IP
  └── Save Click document to MongoDB
        ↓
Dashboard charts update on next view
```

---

## 🔒 Authentication Flow

1. User signs up or logs in
2. Users can authenticate using Email/Password or Google Sign-In
3. Firebase verifies user identity
4. JWT token is issued for authorization
5. Protected routes validate JWT
6. Users can manage only their own links

---

## 🌐 Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas (Mumbai region) |

---

## 🎯 Future Improvements

* Redis caching layer for < 10ms repeat redirects
* Rate limiting per IP
* Link expiration with cron jobs
* Password-protected links
* Custom domain support
* Team collaboration
* Dark mode
* Multi-provider authentication (GitHub, LinkedIn)

---

## 📸 Screenshots

<img width="1469" height="818" alt="Dashboard" src="https://github.com/user-attachments/assets/b76e5f28-e7f2-452d-a465-21aea6a0415f" />

<img width="1466" height="652" alt="Analytics" src="https://github.com/user-attachments/assets/4bde5305-8fcb-4b7c-abd5-105a0cd76f6f" />

<img width="1470" height="828" alt="URL Management" src="https://github.com/user-attachments/assets/2d294cff-46a6-4610-8277-05f153216d27" />

<img width="1469" height="828" alt="QR Code" src="https://github.com/user-attachments/assets/2d294cff-46a6-4610-8277-05f153216d27" />

<img width="1470" height="828" alt="Screenshot 2026-06-18 at 3 48 06 PM" src="https://github.com/user-attachments/assets/701a0249-ec62-46dc-8ebb-ed9f48d8bffa" />


---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
```bash
git checkout -b feature/new-feature
```
3. Commit your changes
```bash
git commit -m "feat: add new feature"
```
4. Push to GitHub
```bash
git push origin feature/new-feature
```
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👩‍💻 Author

**Vibha Yadav**

Built with ❤️ using React, Node.js, Express.js, MongoDB, Firebase Authentication, JWT, and Recharts.
