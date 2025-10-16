import express from 'express';
import doctorsModel from '../models/doctorsModel.js';
import patientModel from '../models/patientModel.js';
import medicationSchema from '../models/medicationSchema.js';
import userModel from '../models/userModel.js';
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
 

doctorRoutes.get('/:id', async (req, res) => {
  try {
    const doctor = await userModel.findById(req.params.id).populate('user', '-password');
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

doctorRoutes.post('/addDoctor', async (req, res) => {
  try {
    const { name, specialty, bio, qualifications, registrationNumber, userId } = req.body;
  
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


doctorRoutes.put('/:id', async (req, res) => {
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





doctorRoutes.post('/addPrescription', async (req, res) => {
  try {
    const { doctorId, patientId, medicationName, dosage, frequency, startDate, endDate, notes } = req.body;

    const doctor = await userModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    const patient = await userModel.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    const newMedication = new medicationSchema({
      patient: patientId,
      medicationName,
      dosage,
      frequency,
      startDate,
      endDate,
      prescribedBy: doctorId,
      notes
    });

    const savedMedication = await newMedication.save();
    res.status(201).json(savedMedication);
  } catch (error) {
    console.error('Error adding prescription:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default doctorRoutes;