# QuickLink

A full-stack URL shortener with authentication, analytics, and QR code generation.

## Tech Stack

- **Frontend:** React, Vite, React Router
- **Backend:** Node.js, Express, MongoDB
- **Auth:** JWT

## Project Structure

```
QuickLink/
├── client/     # React frontend
├── server/     # Express API
└── package.json
```

## Setup

1. Install dependencies:

   ```bash
   npm run install:all
   ```

2. Configure the server environment in `server/.env`:

   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/quicklink
   JWT_SECRET=your_jwt_secret_here
   CLIENT_URL=http://localhost:5173
   ```

3. Start MongoDB locally, then run:

   ```bash
   npm run dev
   ```

- Frontend: http://localhost:5173
- API: http://localhost:5000

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run client and server concurrently |
| `npm run install:all` | Install root, client, and server deps |
| `npm run build` | Build client for production |
| `npm start` | Start production server |
