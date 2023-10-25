import mongoose from "mongoose";

const Schema = mongoose.Schema;

const favSchema = Schema({
    user_id: { type: Schema.Types.ObjectId, requred: true },
    image_id: { type: Schema.Types.ObjectId, required: true }
});

const FavModel = mongoose.models.Favourite || mongoose.model('Favourite', favSchema);

export default FavModel;