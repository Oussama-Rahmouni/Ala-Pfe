import mongoose from 'mongoose';

const { Schema } = mongoose;

const administrationSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    numeroTelephone: { type: String },
    motDePasse: { type: String, required: true },
}, {timestamps:true});

export default mongoose.model('Administration', administrationSchema);
