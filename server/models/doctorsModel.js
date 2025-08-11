import mongoose from 'mongoose';


const doctorSchema = new mongoose.Schema({  name: {
    type: String,
    required: true,
}
,
    specialization: {
        type: String,}
,
    experience: {
        type: Number,
        required: true, 
}});


export default mongoose.model('Doctor', doctorSchema);
