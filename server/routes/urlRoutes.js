import express from 'express';
import {
  createShortUrl,
  getUserUrls,
  deleteUrl,
  getUrlAnalytics,
  checkAlias,        // 👈 add this
} from '../controllers/urlController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/').get(getUserUrls).post(createShortUrl);
router.get('/analytics', getUrlAnalytics);
router.get('/check-alias/:code', checkAlias);  // 👈 add this
router.delete('/:id', deleteUrl);

export default router;