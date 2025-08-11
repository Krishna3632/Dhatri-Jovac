import express from 'express';
import doctorsModel from '../models/doctorsModel';

const router = express.Router();


router.get('/doctors', async (req, res) => {
    try {
        const doctors = await doctorsModel.find({});
        res.status(200).json(doctors);
    }
    catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
);

router.post('/doctors', async (req, res) => {
    try {
        const newDoctor = new doctorsModel(req.body);
        res.status(201).json(await newDoctor.save());
    } catch (error) {
        console.error('Error creating doctor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
);