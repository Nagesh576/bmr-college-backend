const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    collegeName: { type: String, default: 'B.M.R Degree College' },
    address: { type: String, default: 'B.M.R Degree College, Main Road, Gajwel, Siddipet Dist, Telangana 502278' },
    phone: { type: String, default: '+91 98765 43210' },
    email: { type: String, default: 'info@bmrcollege.edu.in' },
    instagramUrl: { type: String, default: 'https://www.instagram.com/bmr_degree_college_gajwel1/' },
    facebookUrl: { type: String, default: '' },
    twitterUrl: { type: String, default: '' },
    linkedinUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
