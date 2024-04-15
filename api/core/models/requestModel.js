import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    status: { type: String, enum: ['new', 'approved', 'rejected'], default: 'new' }
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);

export default Request;
