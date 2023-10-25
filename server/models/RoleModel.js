import mongoose from 'mongoose'

const roleSchema = mongoose.Schema({
    role: { type: String, required: true },
    index: { type: Number, default: 0 },
    price: { type: Number, required: true },
    image_cnt: { type: Number, required: true },
    contents: [String],
    created_at: { type: Date, default: new Date() },
    deleted_at: { type: Date }
})

const Role = mongoose.models.Role || mongoose.model('Role', roleSchema)

export default Role