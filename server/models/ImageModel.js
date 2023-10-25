import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ImageSchema = Schema({
    url: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, required: true },
    user_avatar: { type: String },
    user_name: { type: String, required: true },
    name: { type: String, required: true },
    prompt: { type: String },
    model_id: { type: String, required: true },
    samples: { type: Number, required: true },
    negative_prompt: { type: String },
    init_image: { type: String },
    mask_image: { type: Number },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    prompt_strength: { type: Schema.Types.Decimal128 },
    num_inference_steps: { type: Number },
    guidance_scale: { type: Number },
    enhance_prompt: { type: String },
    seed: Object,
    track_id: Object,
    fav_count: { type: Number, default: 0 },
    is_private: { type: Schema.Types.Boolean, default: false },
    created_at: { type: Date, default: new Date() }
})

const ImageModel = mongoose.models.Image || mongoose.model('Image', ImageSchema);

export default ImageModel;