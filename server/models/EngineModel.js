import mongoose from 'mongoose'

const engineSchema = mongoose.Schema({
    type: { type: Number, required: true }, // 0: text to text 1: text to dezgo image, 2: dalle2 image
    engine_title: { type: String, required: true, default: '' },
    res_type: { type: Number, default: 0 }, // 0: Get response, 1: No response
    name: { type: String, required: true, default: '' },
    api: { type: String, required: true, default: '' },
    key1: { type: String, default: '' },
    value1: { type: String, default: '' },
    key2: { type: String, default: '' },
    value2: { type: String, default: '' },
    key3: { type: String, default: '' },
    value3: { type: String, default: '' },
    category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Category' }
}, {
    timestamps: true
})

const Engine = mongoose.models.Engine || mongoose.model('Engine', engineSchema)
export default Engine