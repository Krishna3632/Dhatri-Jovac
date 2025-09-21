import express from 'express';
import doctorsModel from '../models/doctorsModel.js';

const doctorRoutes = express.Router();


doctorRoutes.get('/doctors', async (req, res) => {
  try {
    const doctors = await doctorsModel.find({});
    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

doctorRoutes.post('/doctors', async (req, res) => {
  try {
    const newDoctor = new doctorsModel(req.body);
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    console.error('Error creating doctor:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default doctorRoutes;
