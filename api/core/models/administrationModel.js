import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, 
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true},
  phone: String,
  password: { type: String, required: true },
  role:{type:String, default:"admin"},
}, { timestamps: true });

export default mongoose.model('Administration', adminSchema);
