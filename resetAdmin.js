const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');
require('dotenv').config();
const bcrypt = require('bcryptjs');

const resetAdmin = async () => {
  await connectDB();
  const email = 'admin@bmr.edu.in';
  let user = await User.findOne({ email });

  if (user) {
    user.password = 'admin'; // Will be hashed by pre('save') hook
    await user.save();
    console.log('Admin user password reset to "admin" successfully.');
  } else {
    await User.create({
      name: 'Admin User',
      email: email,
      password: 'admin',
      role: 'admin'
    });
    console.log('Admin user created successfully.');
  }

  process.exit(0);
};

resetAdmin();
