const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    duration: { type: String, required: true },
    eligibility: { type: String, required: true },
    description: { type: String },
    fee: { type: Number },
    icon: { type: String }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
