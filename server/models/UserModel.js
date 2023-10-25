import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: '' },
    free_token: { type: Number, default: 0 },
    buyed_token: { type: Number, default: 0 },
    avatar: { type: String, default: '' },
    follow_cnt: { type: Number, default: 0 },
    deleted_at: { type: Date }
}, {
    timestamps: true
})

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User