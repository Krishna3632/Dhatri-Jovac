import express from 'express';
import patientModel from '../models/patientModel.js';

const patientRoutes = express.Router();

patientRoutes.get('/getAll', async (req, res) => {
    try {
        const patients = await patientModel.find();
        res.json(patients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
// patientRoutes.get('/:id', async (req, res) => {

export default patientRoutes;