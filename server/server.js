import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import urlRoutes from './routes/urlRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import Url from './models/Url.js';
import Click from './models/Click.js';
import { UAParser } from 'ua-parser-js';

connectDB();

const app = express();

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

// 1. ALL API ROUTERS MUST GO FIRST
app.use('/api/auth', authRoutes);
app.use('/api/urls', urlRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// 2. MOVE THE WILDCARD TO THE BOTTOM (Right before error handlers)
app.get('/:shortCode', async (req, res, next) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });

    if (!url) {
      return res.status(404).json({ message: 'Short URL not found' });
    }

    res.redirect(url.originalUrl);

    const parser = new UAParser(req.headers['user-agent']);
    const device = parser.getDevice().type || 'desktop';
    const browser = parser.getBrowser().name || 'unknown';
    const referrer = req.headers['referer'] || 'direct';

    let country = 'unknown';
    try {
      const ip = req.ip;
      const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
      const geoData = await geoRes.json();
      if (geoData.status === 'success') {
        country = geoData.country;
      }
    } catch (geoError) {
      console.error('Geo error:', geoError.message);
    }

    await Click.create({
      urlId: url._id,
      device,
      browser,
      country,
      referrer,
    });

    Url.updateOne(
      { _id: url._id },
      { $inc: { clicks: 1 } }
    ).exec();

  } catch (error) {
    next(error);
  }
});

// 3. ERROR HANDLERS GO LAST
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));