import ImageModel from '../../models/ImageModel.js';
import UserModel from '../../models/userModel.js'
import FavModel from '../../models/FavouriteModel.js';
import FollowModel from '../../models/FollowModel.js';

/**
 * @description
 *  Create image (prompt, url, negPrompt ...)
 */
export const createImage = async (req, res) => {
    const { images, settings } = req.body;

    try {
        // Get User
        const user = await UserModel.findById(req.userId);
        // Add Records    
        const cnt = images.length;
        let newImages = [];
        for (let i = 0; i < cnt; i++) {
            const newImage = new ImageModel({
                url: images[i],
                user_id: req.userId,
                user_avatar: user?.avatar,
                user_name: user.name,
                name: settings.prompt,
                prompt: settings.prompt,
                model_id: settings.model_id,
                samples: settings.samples,
                negative_prompt: settings.negative_prompt,
                init_image: settings.init_image,
                mask_image: settings.mask_image,
                width: settings.width,
                height: settings.height,
                prompt_strength: settings.prompt_strength,
                num_inference_steps: settings.num_inference_steps,
                guidance_scale: settings.guidance_scale,
                enhance_prompt: settings.enhance_prompt,
                seed: settings.seed,
                webhook: settings.webhook,
                track_id: settings.track_id
            });
            await newImage.save();
            newImages[i] = newImage;
        }
        res.status(200).json(newImages);
    } catch (err) {
        res.status(500).json({ err });
    }
}

/**
 * @description
 *  Search images by keyword 
 */
export const searchImageByKeyword = async (req, res) => {
    const { keyword } = req.body;
    try {
        const images = await ImageModel.find({ prompt: { $regex: keyword } }).sort({ created_at: -1 }).exec();
        res.status(200).json({ images: images });
    } catch (err) {
        res.status(500).json({ err });
    }
}

/**
 * @description
 *  Add or remove favourite from image.
 */
export const favouriteImg = async (req, res) => {
    let { imageId } = req.body;
    let userId = req.userId;
    try {
        let fav = await FavModel.findOne({ user_id: userId, image_id: imageId });
        let image = await ImageModel.findById(imageId);

        if (fav) await FavModel.deleteOne({ user_id: userId, image_id: imageId });
        else await FavModel.create({ user_id: userId, image_id: imageId });
        await ImageModel.findOneAndUpdate({ _id: imageId }, {
            fav_count: (fav ? (image.fav_count - 1) : (image.fav_count + 1))
        });
        image = await ImageModel.findById(imageId);

        return res.status(200).json({ image: image, isFav: (fav ? false : true) });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

/**
 * @description
 *  Get image by id.
 */
export const getImageById = async (req, res) => {
    let { imageId } = req.body;
    let userId = req.userId;

    try {
        let fav = await FavModel.findOne({ user_id: userId, image_id: imageId });
        let image = await ImageModel.findById(imageId);
        //let follow = await FollowModel.findOne({ user_id: image.user_id, follower_id: userId });

        return res.status(200).json({
            image: image,
            isFav: (fav ? true : false),
            isFollow: (false),
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

/**
 * @description
 *  Follow image author
 */
export const followImgAuthor = async (req, res) => {
    const { authorId, isFollow } = req.body;
    const userId = req.userId;

    try {
        if (isFollow)
            await FollowModel.create({ user_id: authorId, follower_id: userId });
        else
            await FollowModel.deleteOne({ user_id: authorId, follower_id: userId });

        return res.status(200).json({
            isFollow: isFollow,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

/**
 * @description
 *  Make image for private or public.
 */
export const makePrivate = async (req, res) => {
    const imageId = req.body._id;
    const isPrivate = req.body.is_private === true ? false : true;

    try {
        await ImageModel.findOneAndUpdate({ _id: imageId }, {
            is_private: isPrivate
        });
        const image = await ImageModel.findById(imageId);
        res.status(200).json({ image });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}