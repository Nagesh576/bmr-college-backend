const Event = require('../models/Event');
const Notice = require('../models/Notice');
const Course = require('../models/Course');
const Gallery = require('../models/Gallery');
const Contact = require('../models/Contact');
const Settings = require('../models/Settings');
const Admission = require('../models/Admission');

// EVENTS
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// NOTICES
exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createNotice = async (req, res) => {
  try {
    const notice = await Notice.create(req.body);
    res.status(201).json(notice);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// COURSES
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// GALLERY
exports.getGallery = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.uploadGalleryImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    // In a real scenario, multer-storage-cloudinary or a direct upload logic applies here
    // For now we assume req.file.path represents the URL saved by multer middleware or Cloudinary integration 
    const galleryEntry = await Gallery.create({
      title: req.body.title || 'Untitled',
      imageUrl: req.file.path, // Assuming it's uploaded and path is attached
      category: req.body.category || 'General'
    });
    res.status(201).json(galleryEntry);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// CONTACT
exports.submitContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ message: 'Contact submitted successfully', contact });
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// ADMISSION
exports.submitAdmission = async (req, res) => {
  try {
    const admission = await Admission.create(req.body);
    res.status(201).json({ message: 'Admission form submitted', admission });
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.getAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find().sort({ createdAt: -1 });
    res.json(admissions);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// SETTINGS
exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({}); // Create default settings if not exists
    }
    res.json(settings);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      settings = await Settings.findOneAndUpdate({}, req.body, { new: true });
    }
    res.json(settings);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// CONTACT ADMIN VIEW
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json({ message: 'Contact message deleted successfully' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteAdmission = async (req, res) => {
  try {
    const admission = await Admission.findByIdAndDelete(req.params.id);
    if (!admission) return res.status(404).json({ message: 'Admission not found' });
    res.json({ message: 'Admission application deleted successfully' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
