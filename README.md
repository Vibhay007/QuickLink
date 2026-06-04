# 🚀 QuickLink

QuickLink is a full-stack URL shortener that allows users to create, manage, and track shortened links with ease. It includes secure authentication, detailed analytics, QR code generation, and a modern user-friendly interface.

---

## 🌟 Features

### 🔐 Authentication & Security
- User Registration & Login
- JWT-based Authentication
- Protected Routes
- Secure Password Handling

### 🔗 URL Shortening
- Generate short URLs instantly
- Custom short links support
- Redirect users to original URLs

### 📊 Analytics Dashboard
- Track total clicks
- Monitor link performance
- View user-specific URLs
- Analyze link engagement

### 📱 QR Code Generation
- Generate QR codes for shortened URLs
- Easy sharing across devices
- Download and use QR codes anywhere

### 👤 User Dashboard
- Manage all created links
- Delete links
- View analytics for each URL
- Organized and responsive interface

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- React Router

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- JWT (JSON Web Tokens)

### Additional Libraries
- QR Code Generator
- Axios
- Mongoose
- bcryptjs
- dotenv
- Resend (Email Service)

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

RESEND_API_KEY=your_resend_api_key
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/Vibhay007/QuickLink.git

cd quicklink
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

- Total Clicks
- Link Performance Tracking
- User-Specific URL Statistics
- Real-Time Usage Monitoring

---

## 📱 QR Code Support

Each shortened URL can be converted into a QR code, making it easy to:

- Share links quickly
- Access URLs from mobile devices
- Use links in presentations, posters, and documents

---

## 🔒 Authentication Flow

1. User registers an account
2. User logs in
3. JWT token is issued
4. Protected routes validate JWT
5. Users can manage only their own links

---

## 🌐 Deployment

### Frontend
- Vercel 

### Backend
- Render

### Database
- MongoDB Atlas

---

## 🎯 Future Improvements

- Custom Domain Support
- Advanced Analytics
- Link Expiration
- Password-Protected Links
- Team Collaboration
- Geo-location Tracking
- Dark Mode

---

## 📸 Screenshots


<img width="1469" height="818" alt="Screenshot 2026-06-04 at 3 03 01 PM" src="https://github.com/user-attachments/assets/b76e5f28-e7f2-452d-a465-21aea6a0415f" />
<img width="1466" height="652" alt="Screenshot 2026-06-04 at 3 02 49 PM" src="https://github.com/user-attachments/assets/4bde5305-8fcb-4b7c-abd5-105a0cd76f6f" />
<img width="1470" height="828" alt="Screenshot 2026-06-04 at 3 02 35 PM" src="https://github.com/user-attachments/assets/2d294cff-46a6-4610-8277-05f153216d27" />
<img width="1469" height="828" alt="Screenshot 2026-06-04 at 3 01 50 PM" src="https://github.com/user-attachments/assets/ad75985c-4d35-4225-9bc5-c86376f3186f" />

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push branch

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

Built with ❤️ using React, Node.js, Express, MongoDB, and JWT.
