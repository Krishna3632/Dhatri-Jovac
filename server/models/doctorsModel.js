import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  qualifications: [String],
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model('Doctor', doctorSchema);
