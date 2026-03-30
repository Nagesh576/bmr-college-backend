const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');
require('dotenv').config();

const seedAdmin = async () => {
  await connectDB();
  const email = 'admin@bmr.edu.in';
  const userExists = await User.findOne({ email });
  if (!userExists) {
    await User.create({
      name: 'Admin User',
      email: email,
      password: 'admin',
      role: 'admin'
    });
    console.log('Admin user created successfully');
  } else {
    console.log('Admin user already exists');
  }
  process.exit(0);
};

seedAdmin();
