import express from 'express';
import {
  createShortUrl,
  getUserUrls,
  deleteUrl,
  getUrlAnalytics,
  checkAlias,
  getClickAnalytics,  // ← add this
} from '../controllers/urlController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/').get(getUserUrls).post(createShortUrl);
router.get('/analytics', getUrlAnalytics);
router.get('/check-alias/:code', checkAlias);
router.get('/:id/analytics', getClickAnalytics);  // ← add this
router.delete('/:id', deleteUrl);

export default router;