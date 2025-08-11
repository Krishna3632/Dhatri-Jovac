import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
     name: {
        type:String,
        default:"Not Defined",
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    history: {
        type: Object.
    }
});