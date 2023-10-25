import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const followSchema = Schema({
    user_id: { type: Schema.Types.ObjectId, required: true },
    follower_id: { type: Schema.Types.ObjectId, required: true }
})

const FollowModel = mongoose.models.Follow || mongoose.model('Follow', followSchema);

export default FollowModel;