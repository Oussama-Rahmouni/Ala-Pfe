import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  startDate: Date,
  endDate: Date,
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer'
  },
  learners: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Learner'
  }],
  category: String,
  certificateLink: String
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);
