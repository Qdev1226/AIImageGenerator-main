import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const patternSchema = Schema({
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    engine: { type: Schema.Types.ObjectId, ref: 'Engine', required: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    user_content: { type: String, default: '' },
    system_content: { type: String, default: '' },
    assistant_content: { type: String, default: '' },
    tool_logo: { type: String },
}, {
    timestamps: true
})

const Pattern = mongoose.models.Pattern || mongoose.model('Pattern', patternSchema)
export default Pattern