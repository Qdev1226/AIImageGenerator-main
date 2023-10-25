import mongoose from 'mongoose'

const adminSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: String,
    expireToken: Date,
    created_at: { type: Date, default: new Date() },
})

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema)

export default Admin