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
router.post('/contact', apiController.submitContact);
router.post('/admission', protect, apiController.submitAdmission);

// Admin Protected Routes
router.post('/events', protect, admin, apiController.createEvent);
router.post('/notices', protect, admin, apiController.createNotice);
router.post('/courses', protect, admin, apiController.createCourse);
router.get('/admissions', protect, admin, apiController.getAdmissions);

// Gallery Upload Route
router.post('/gallery', upload.single('image'), apiController.uploadGalleryImage);

module.exports = router;
