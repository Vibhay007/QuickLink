import Url from '../models/Url.js';
import generateShortCode from '../utils/generateShortCode.js';
import validateUrl, { normalizeUrl } from '../utils/validateUrl.js';

const getBaseUrl = (req) => `${req.protocol}://${req.get('host')}`;

export const createShortUrl = async (req, res, next) => {
  try {
    const { originalUrl, title, customAlias } = req.body;

    if (!validateUrl(originalUrl)) {
      return res.status(400).json({ message: 'Invalid URL' });
    }

    const normalized = normalizeUrl(originalUrl);
    let shortCode;

    if (customAlias) {
      const isValid = /^[a-zA-Z0-9-_]{3,30}$/.test(customAlias);
      if (!isValid) {
        return res.status(400).json({ message: 'Alias must be 3-30 chars, letters/numbers/hyphens only' });
      }

      const RESERVED = ['dashboard', 'login', 'logout', 'register', 'admin', 'api'];
      if (RESERVED.includes(customAlias.toLowerCase())) {
        return res.status(400).json({ message: 'This alias is reserved' });
      }

      const exists = await Url.findOne({ shortCode: customAlias });
      if (exists) {
        return res.status(409).json({ message: 'Alias already taken' });
      }

      shortCode = customAlias;
    } else {
      let exists = true;
      while (exists) {
        shortCode = generateShortCode();
        exists = await Url.findOne({ shortCode });
      }
    }

    const url = await Url.create({
      user: req.user._id,
      originalUrl: normalized,
      shortCode,
      title: title || '',
    });

    res.status(201).json({
      ...url.toObject(),
      shortUrl: `${getBaseUrl(req)}/${url.shortCode}`,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserUrls = async (req, res, next) => {
  try {
    const urls = await Url.find({ user: req.user._id }).sort({ createdAt: -1 });
    const baseUrl = getBaseUrl(req);

    res.json(
      urls.map((url) => ({
        ...url.toObject(),
        shortUrl: `${baseUrl}/${url.shortCode}`,
      }))
    );
  } catch (error) {
    next(error);
  }
};

export const deleteUrl = async (req, res, next) => {
  try {
    const url = await Url.findById(req.params.id);

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    if (url.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await url.deleteOne();
    res.json({ message: 'URL removed' });
  } catch (error) {
    next(error);
  }
};

export const getUrlAnalytics = async (req, res, next) => {
  try {
    const urls = await Url.find({ user: req.user._id });
    const totalClicks = urls.reduce((sum, u) => sum + u.clicks, 0);

    res.json({
      totalUrls: urls.length,
      totalClicks,
      topUrls: [...urls].sort((a, b) => b.clicks - a.clicks).slice(0, 5),
    });
  } catch (error) {
    next(error);
  }
};

export const checkAlias = async (req, res, next) => {
  try {
    const { code } = req.params;

    const isValid = /^[a-zA-Z0-9-_]{3,30}$/.test(code);
    if (!isValid) {
      return res.json({ available: false, reason: 'Invalid format' });
    }

    const RESERVED = ['dashboard', 'login', 'logout', 'register', 'admin', 'api'];
    if (RESERVED.includes(code.toLowerCase())) {
      return res.json({ available: false, reason: 'Reserved word' });
    }

    const exists = await Url.findOne({ shortCode: code });
    res.json({ available: !exists });
  } catch (error) {
    next(error);
  }
};