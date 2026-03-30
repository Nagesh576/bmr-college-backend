const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');
require('dotenv').config();

const checkUser = async () => {
  await connectDB();
  const user = await User.findOne({ email: 'admin@bmr.edu.in' });
  console.log('User found:', user);
  if (user) {
    const isMatch = await user.matchPassword('admin');
    console.log('Password match for admin:', isMatch);
  } else {
    console.log('User NOT found!');
  }
  process.exit(0);
};

checkUser();
