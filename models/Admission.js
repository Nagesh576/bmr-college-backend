const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    courseOfInterest: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    previousEducation: { type: String, required: true },
    marksPercentage: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admission', admissionSchema);
