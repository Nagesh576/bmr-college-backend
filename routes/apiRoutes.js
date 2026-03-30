const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const { protect, admin } = require('../middleware/authMiddleware');
const apiController = require('../controllers/apiController');

// Set up Cloudinary storage using the real credentials
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'bmr_gallery',
    allowedFormats: ['jpeg', 'png', 'jpg', 'webp', 'mp4'],
  },
});

const upload = multer({ storage: storage });

// Public Routes
router.get('/events', apiController.getEvents);
router.get('/notices', apiController.getNotices);
router.get('/courses', apiController.getCourses);
router.get('/gallery', apiController.getGallery);

// Force Reset Admin
router.get('/reset-admin', async (req, res) => {
  const User = require('../models/User');
  try {
    const email = 'admin@bmr.edu.in';
    let user = await User.findOne({ email });
    if (user) {
      user.password = 'admin'; // Pre save hook will hash
      await user.save();
      res.json({ message: 'Overwritten existing admin password to: admin' });
    } else {
      await User.create({ name: 'Admin User', email, password: 'admin', role: 'admin' });
      res.json({ message: 'Created brand new admin. Password: admin' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/contact', apiController.submitContact);
router.post('/admission', apiController.submitAdmission);

// Admin Protected Routes
router.post('/events', protect, admin, apiController.createEvent);
router.post('/notices', protect, admin, apiController.createNotice);
router.post('/courses', protect, admin, apiController.createCourse);
router.get('/admissions', protect, admin, apiController.getAdmissions);

// Gallery Upload Route
router.post('/gallery', upload.single('image'), apiController.uploadGalleryImage);

module.exports = router;
