import express from 'express';
import patientModel from '../models/patientModel.js';
import medicationSchema from '../models/medicationSchema.js';

const patientRoutes = express.Router();



patientRoutes.post('/create', async (req, res) => {
    try {
        const { name, age, gender, contactInfo } = req.body;
        const newPatient = new patientModel({
            name,age,gender,contactInfo,isDoctor:false
        });
        await newPatient.save();
        res.status(201).json(newPatient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
patientRoutes.get('/getAll', async (req, res) => {
    try {
        const patients = await patientModel.find();
        const filteredPatients = patients.filter(p => p.isDoctor === false);
        res.json(filteredPatients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

patientRoutes.get('/profile/:id',async (req, res) => {
    try {
        const patient = [await patientModel.findById(req.params.id)];
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(patient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

patientRoutes.delete('/delete/:id', async (req, res) => {
    try {
        const patient = await patientModel.findByIdAndDelete(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json({ message: 'Patient deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

patientRoutes.get('/medications/:id', async (req, res) => {
    try {
        const medications = await medicationSchema.find({ patient: req.params.id });
        if (!medications) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(medications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default patientRoutes;