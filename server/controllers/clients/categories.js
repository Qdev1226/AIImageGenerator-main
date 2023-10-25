import CategoryModel from "../../models/CategoryModel.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.aggregate([
      {
        $project: {
          "value": "$name",
          "name": "$name"
        }
      },
      {
        $sort: {
          name: 1
        }
      }
    ]).exec();
    res.status(200).json({ categories: categories });
  } catch (err) {
    res.status(500).json({ err });
  }
};
