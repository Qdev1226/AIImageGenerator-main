import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const saleSchema = Schema({
    user_id: { type: Schema.Types.ObjectId, required: true },
    user_name: { type: String, required: true },
    user_email: { type: String, required: true },
    user_avatar: { type: String },
    // price: {type: Schema.Types.Decimal128},
    price: { type: Number },
    role_id: { type: Schema.Types.ObjectId, required: true },
    role_idx: { type: Number, default: 0 },
    created_at: { type: Date, default: new Date() },
    deleted_at: { type: Date },

})

const Sale = mongoose.models.Sale || mongoose.model('Sale', saleSchema)
export default Sale