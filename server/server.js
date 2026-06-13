import express from 'express';
import cors from 'cors';
// import dotenv from 'dotenv';
import 'dotenv/config'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import urlRoutes from './routes/urlRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import Url from './models/Url.js';

// dotenv.config();

connectDB();

const app = express();

/* Add this */
app.set('trust proxy', 1);

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      process.env.CLIENT_URL || 'https://quick-link-sigma.vercel.app'
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/urls', urlRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/:shortCode', async (req, res, next) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });

    if (!url) {
      return res.status(404).json({ message: 'Short URL not found' });
    }

    url.clicks += 1;
    await url.save();

    return res.redirect(url.originalUrl);
  } catch (error) {
    next(error);
  }
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);