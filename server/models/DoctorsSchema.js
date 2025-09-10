import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  // A reference to the user's account, linking the doctor profile to a login.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  // The doctor's full name.
  name: {
    type: String,
    required: true,
  },
  
  // The doctor's medical specialty.
  specialty: {
    type: String,
    required: true,
  },
  
  // A brief biography or description of the doctor.
  bio: {
    type: String,
  },
  
  // The doctor's professional qualifications.
  qualifications: [String],
  
  // The doctor's professional registration number.
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  }
});

export default mongoose.model('Docters', DoctorSchema);