import mongoose from 'mongoose'

const freeTokenCountSchema = mongoose.Schema({
    count: { type: Number, required: true }
}, {
    timestamps: true
})

const FreeTokenCount = mongoose.models.FreeTokenCount || mongoose.model('FreeTokenCount', freeTokenCountSchema)
export default FreeTokenCount