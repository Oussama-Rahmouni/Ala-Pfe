import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: {type:String},
  password: { type: String, required: true },
  expertise: [String],
  role:{type:String, default:"trainer"},
  coursesTeaching: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
}, { timestamps: true });

export default mongoose.model('Trainer', trainerSchema);
