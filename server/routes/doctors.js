import express from 'express';
import doctorsModel from '../models/doctorsModel.js';

const doctorRoutes = express.Router();


doctorRoutes.get('/doctors', async (req, res) => {
  try {
    const doctors = await doctorsModel.find({}).populate('user', '-password');
    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
 

doctorRoutes.get('/doctors/:id', async (req, res) => {
  try {
    const doctor = await doctorsModel.findById(req.params.id).populate('user', '-password');
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new doctor
doctorRoutes.post('/doctors', async (req, res) => {
  try {
    const { name, specialty, bio, qualifications, registrationNumber, userId } = req.body;
    
    // Check if registration number already exists
    const existingDoctor = await doctorsModel.findOne({ registrationNumber });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Registration number already exists' });
    }

    const newDoctor = new doctorsModel({
      user: userId,
      name,
      specialty,
      bio,
      qualifications,
      registrationNumber
    });

    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    console.error('Error creating doctor:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});


doctorRoutes.put('/doctors/:id', async (req, res) => {
  try {
    const updatedDoctor = await doctorsModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(updatedDoctor);
  } catch (error) {
    console.error('Error updating doctor:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});


doctorRoutes.delete('/doctors/:id', async (req, res) => {
  try {
    const deletedDoctor = await doctorsModel.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default doctorRoutes;