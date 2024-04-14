import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: String,
  password: { type: String, required: true },
  role:{type:String, default:"admin"},
}, { timestamps: true });

export default mongoose.model('Administration', adminSchema);
