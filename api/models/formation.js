import mongoose from 'mongoose';

const { Schema } = mongoose;

const formationSchema = new Schema({
    titre: { type: String, required: true },
    description: { type: String },
    duree: { type: Date, required: true },
    formateur: { type: Schema.Types.ObjectId, ref: 'Instructor', required: true },
}, {timestamps:true});

export default mongoose.model('Formation', formationSchema);
