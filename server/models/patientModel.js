import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  // The user's unique identifier.
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  

  name: {
    type: String,
    required: true,
  },
  
  // The user's email address, used for login. It must be unique.
  email: {
    type: String,
    required: true,
    unique: true,
  },
  
  // The user's hashed password for secure authentication.
  password: {
    type: String,
    required: true,
  },
  
  // A boolean to distinguish between patients and doctors.
  isDoctor: {
    type: Boolean,
    default: false,
  },
  
  // Timestamps to track when the user was created and last updated.
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Users', UserSchema);