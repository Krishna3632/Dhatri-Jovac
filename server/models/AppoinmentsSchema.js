import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  // The patient who booked the appointment.
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  // The doctor the appointment is with.
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  
  // The scheduled date of the appointment.
  date: {
    type: Date,
    required: true,
  },
  
  // The scheduled time slot of the appointment.
  time: {
    type: String,
    required: true,
  },
  
  // The current status of the appointment (e.g., 'pending', 'confirmed', 'completed', 'canceled').
  status: {  
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'canceled'],
    default: 'pending',
  },
  
  // The reason for the appointment.
  reason: {
    type: String,
    required: true,
  },
  
  // A unique URL for a telemedicine call.
  telemedicineUrl: {
    type: String,
  },
  
  // Timestamps for the appointment.
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Appointments', AppointmentSchema);