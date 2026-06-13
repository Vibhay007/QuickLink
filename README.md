# 🚀 QuickLink

QuickLink is a full-stack URL shortener that allows users to create, manage, and track shortened links with ease. It includes secure authentication, detailed analytics, QR code generation, and a modern user-friendly interface.

---

## ✨ Highlights

* Full-stack MERN application
* Firebase Google Authentication
* JWT-based Authorization
* URL Analytics Dashboard
* QR Code Generation
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
* Custom short links support
* Redirect users to original URLs

### 📊 Analytics Dashboard

* Track total clicks
* Monitor link performance
* View user-specific URLs
* Analyze link engagement

### 📱 QR Code Generation

* Generate QR codes for shortened URLs
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

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication

* Firebase Authentication
* JWT (JSON Web Tokens)

### Additional Libraries

* Axios
* Mongoose
* bcryptjs
* dotenv
* Firebase
* QR Code Generator

---

## 📂 Project Structure

```bash
QuickLink/
│
├── client/          # React Frontend
│
├── server/          # Node.js Backend
│
├── README.md
│
└── package.json
```

---

## ⚙️ Environment Variables

### Backend (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

BASE_URL=http://localhost:5000
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000

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

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

---

## 📈 Analytics

QuickLink provides analytics for each shortened URL including:

* Total Clicks
* Link Performance Tracking
* User-Specific URL Statistics
* Real-Time Usage Monitoring

---

## 📱 QR Code Support

Each shortened URL can be converted into a QR code, making it easy to:

* Share links quickly
* Access URLs from mobile devices
* Use links in presentations, posters, and documents

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

### Frontend

* Vercel

### Backend

* Render

### Database

* MongoDB Atlas

---

## 🎯 Future Improvements

* Custom Domain Support
* Advanced Analytics
* Link Expiration
* Password-Protected Links
* Team Collaboration
* Geo-location Tracking
* Dark Mode
* Multi-Provider Authentication (GitHub, LinkedIn)

---

## 📸 Screenshots

<img width="1469" height="818" alt="Dashboard" src="https://github.com/user-attachments/assets/b76e5f28-e7f2-452d-a465-21aea6a0415f" />

<img width="1466" height="652" alt="Analytics" src="https://github.com/user-attachments/assets/4bde5305-8fcb-4b7c-abd5-105a0cd76f6f" />

<img width="1470" height="828" alt="URL Management" src="https://github.com/user-attachments/assets/2d294cff-46a6-4610-8277-05f153216d27" />

<img width="1469" height="828" alt="QR Code" src="https://github.com/user-attachments/assets/ad75985c-4d35-4225-9bc5-c86376f3186f" />

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
git commit -m "Add new feature"
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

## 👨‍💻 Author

**Vibha Yadav**

Built with ❤️ using React, Node.js, Express.js, MongoDB, Firebase Authentication, and JWT.
