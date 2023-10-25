import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const textHistorySchema = Schema({
    pattern: { type: Schema.Types.ObjectId, ref: 'Pattern', required: true },
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    subject_id: { type: String },
    subject_title: { type: String },
    content: { type: Array },
    created_at: { type: Date, default: new Date() }
})

const TextHistory = mongoose.models.TextHistory || mongoose.model('TextHistory', textHistorySchema)
export default TextHistory