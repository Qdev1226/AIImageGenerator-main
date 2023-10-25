import PatternModel from "../../models/PatternModel.js";
import CategoryModel from "../../models/CategoryModel.js";
import EngineModel from "../../models/EngineModel.js";

export const getModelsByCategory = async (req, res) => {
  try {
    var models, query;
    let category_name = req.body.category_name;
    if( category_name == "" ) {
        // models = await PatternModel.find().exec();
        query = await PatternModel.aggregate([
            {
                $lookup: {
                    from: CategoryModel.collection.name, // categories
                    localField: "category_id",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $lookup: {
                    from: EngineModel.collection.name, // engines
                    localField: "engine_id",
                    foreignField: "_id",
                    as: "engine"
                }
            },
            {
                $sort: {
                    name: 1
                }
            },
            {
                $addFields: {
                    "value": "$_id"
                }
            }
        ]);
    } else {
        // models = await PatternModel.find({ category_id : [ { name: category_name } ] }).
        //         populate("category_id").exec();
        query = await PatternModel.aggregate([
            {
                $lookup: {
                    from: CategoryModel.collection.name, // categories
                    localField: "category_id",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $lookup: {
                    from: EngineModel.collection.name, // engines
                    localField: "engine_id",
                    foreignField: "_id",
                    as: "engine"
                }
            },
            {
                $match: {
                    "category.name": category_name
                }
            },
            {
                $sort: {
                    name: 1
                }
            },
            {
                $addFields: {
                    "value": "$_id"
                }
            }
        ]);
    }
    const populateQuery = [];
    models = await PatternModel.populate( query, populateQuery );
    res.status(200).json({ models: models });
  } catch (err) {
    res.status(500).json({ err });
  }
};
