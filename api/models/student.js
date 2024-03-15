import mongoose from 'mongoose';

const { Schema } = mongoose;

const studentSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    numeroTelephone: { type: String },
    motDePasse: { type: String, required: true },
    formationsEnCours: [{ type: Schema.Types.ObjectId, ref: 'Formation' }],
    formationsAccomplies: [{ type: Schema.Types.ObjectId, ref: 'Formation' }],
    centreInterets: [{ type: String }],
}, {timestamps:true});

export default mongoose.model('Student', studentSchema);
