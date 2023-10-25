import mongoose from 'mongoose'

const membershipCountSchema = mongoose.Schema({
    title: { type: String, required: true },
    membership: { type: Number, required: true },
    tokens: { type: Number, required: true },
    monthly_price: { type: mongoose.Types.Decimal128, required: true },
    annual_price: { type: mongoose.Types.Decimal128, required: true },
}, {
    timestamps: true
})

const Membership = mongoose.models.Membership || mongoose.model('Membership', membershipCountSchema)
export default Membership