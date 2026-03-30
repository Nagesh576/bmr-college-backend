const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');
require('dotenv').config();
const fs = require('fs');

const run = async () => {
    try {
        await connectDB();
        const user = await User.findOne({ email: 'admin@bmr.edu.in' });
        let out = "Found user: " + (user ? user.email : "none") + "\n";
        
        if (user) {
            const isMatch = await user.matchPassword('admin');
            out += "Password match? " + isMatch + "\n";
            out += "Current Hash: " + user.password + "\n";
        }
        
        fs.writeFileSync("output_log.txt", out);
    } catch (e) {
        fs.writeFileSync("output_log.txt", "Error: " + e.message);
    } finally {
        process.exit(0);
    }
};

run();
