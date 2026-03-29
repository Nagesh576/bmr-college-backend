const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'BMR',
  api_key: process.env.CLOUDINARY_API_KEY || '635986499776446',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'Qm5kr3KCr3TZj6lFYEJtMGv9Wxo',
});

module.exports = cloudinary;
