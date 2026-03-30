const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');
require('dotenv').config();

const verify = async () => {
    try {
        await connectDB();
        const user = await User.findOne({ email: 'admin@bmr.edu.in' });
        console.log("Found user:", user);
        
        if (user) {
            const isMatch = await user.matchPassword('admin');
            console.log("Password match?", isMatch);
        } else {
            console.log("No user found by that email!");
        }
    } catch (e) {
        console.error("Error connecting or verifying:", e);
    } finally {
        process.exit(0);
    }
};

verify();
