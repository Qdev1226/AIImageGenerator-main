import mongoose from 'mongoose'

const filterSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    prompt: { type: String, required: true },
    avatar: { type: String },
    created_at: { type: Date, default: new Date() },
    deleted_at: { type: Date },
})

const Filter = mongoose.models.Filter || mongoose.model('Filter', filterSchema)
export default Filter