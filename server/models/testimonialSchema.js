import mongoose from 'mongoose';
const TestimonialSchema = new mongoose.Schema({
  // The testimonial text.
  text: {
    type: String,
    required: true,
  },
  
  // The name of the person giving the testimonial.
  authorName: {
    type: String,
    required: true,
  },
  
  // The author's role (e.g., "Business Executive").
  authorRole: {
    type: String,
  },
  
  // The author's location (e.g., "Mumbai").
  authorLocation: {
    type: String,
  },
  
  // The rating given, typically from 1 to 5 stars.
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  
  // A reference to the user who wrote the testimonial (optional).
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

export default mongoose.model('Testimonial', TestimonialSchema);