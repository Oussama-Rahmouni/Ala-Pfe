import mongoose from 'mongoose';

const { Schema } = mongoose;

const formateurSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    numeroTelephone: { type: String },
    motDePasse: { type: String, required: true },
    formationsAFormer: [{ type: Schema.Types.ObjectId, ref: 'Formation' }],
    formationsTerminees: [{ type: Schema.Types.ObjectId, ref: 'Formation' }],
}, {timestamps:true});

export default mongoose.model('Formateur', formateurSchema);
