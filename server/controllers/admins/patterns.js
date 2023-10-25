import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Models from '../../models/PatternModel.js'
dotenv.config()

export const getAllModels = async (req, res) => {
    try {
        const models = await Models.find({ deleted_at: null }).sort({ _id: 1 })
        res.status(200).json({ data: models });
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: err.message });
    }
}

export const getModels = async (req, res) => {
    try {
        const page = req.body.page
        const limit = req.body.rowsPerPage
        const searchKey = req.body.searchKey
        const category = req.body.category
        const engine = req.body.engine

        let pattern = {}

        if (category == '-1' && engine == '-1') {
            if (searchKey == '') {
                pattern = {}
            } else {
                pattern = {
                    $or: [
                        {
                            name: {
                                $regex: new RegExp(searchKey.toLowerCase(), "i")
                            }
                        },
                        {
                            system_content: {
                                $regex: new RegExp(searchKey.toLowerCase(), "i")
                            }
                        },
                        {
                            assistant_content: {
                                $regex: new RegExp(searchKey.toLowerCase(), "i")
                            }
                        }
                    ]
                }
            }
        } else if (category == '-1' && engine != '-1') {
            if (searchKey == '') {
                pattern = {
                    engine: engine
                }
            } else {
                pattern = {
                    $and: [
                        {
                            engine: engine
                        },
                        {
                            $or: [
                                {
                                    name: {
                                        $regex: new RegExp(searchKey.toLowerCase(), "i")
                                    }
                                },
                                {
                                    system_content: {
                                        $regex: new RegExp(searchKey.toLowerCase(), "i")
                                    }
                                },
                                {
                                    assistant_content: {
                                        $regex: new RegExp(searchKey.toLowerCase(), "i")
                                    }
                                }
                            ]
                        }
                    ]
                }
            }
        } else if (category != '-1' && engine == '-1') {
            if (searchKey == '') {
                pattern = {
                    category: category
                }
            } else {
                pattern = {
                    $and: [
                        {
                            category: category
                        },
                        {
                            $or: [
                                {
                                    name: {
                                        $regex: new RegExp(searchKey.toLowerCase(), "i")
                                    }
                                },
                                {
                                    system_content: {
                                        $regex: new RegExp(searchKey.toLowerCase(), "i")
                                    }
                                },
                                {
                                    assistant_content: {
                                        $regex: new RegExp(searchKey.toLowerCase(), "i")
                                    }
                                }
                            ]
                        }
                    ]
                }
            }
        } else if (category != '-1' && engine != '-1') {
            if (searchKey == '') {
                pattern = {
                    $and: [
                        {
                            category: category
                        },
                        {
                            engine: engine
                        }
                    ]
                }
            }
        } else {
            pattern = {
                $and: [
                    {
                        category: category
                    },
                    {
                        engine: engine
                    },
                    {
                        $or: [
                            {
                                name: {
                                    $regex: new RegExp(searchKey.toLowerCase(), "i")
                                }
                            },
                            {
                                system_content: {
                                    $regex: new RegExp(searchKey.toLowerCase(), "i")
                                }
                            },
                            {
                                assistant_content: {
                                    $regex: new RegExp(searchKey.toLowerCase(), "i")
                                }
                            }
                        ]
                    }
                ]
            }
        }

        const startIndex = (Number(page)) * limit
        const models = await Models.find(pattern).populate('category').populate('engine').sort({ _id: 1 }).limit(limit).skip(startIndex);
        const totalCount = await Models.find(pattern).countDocuments()
        res.status(200).json({ data: models, currentPage: Number(page), totalCount: totalCount });
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: err.message });
    }
}

export const addModel = async (req, res) => {
    const { category, engine, name, description, system_content, user_content, assistant_content, tool_logo } = req.body
    try {
        // create a new filter with default values
        const result = await Models.create({
            category: category,
            engine: engine,
            name: name,
            description: description,
            system_content: system_content,
            user_content: user_content,
            assistant_content: assistant_content,
            tool_logo: tool_logo,
        })

        res.status(200).json({ newModel: result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
}

export const deleteModel = async (req, res) => {
    const id = req.body.modelId
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No model with that ID')
        const updateResult = await Models.findByIdAndDelete({ _id: id })
        res.json({ msg: 'Model deleted successfully' })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

export const updateModel = async (req, res) => {
    const { category, engine, name, description, system_content, user_content, assistant_content, tool_logo } = req.body
    try {
        await Models.findByIdAndUpdate({
            _id: req.body._id,
        }, {
            category: category,
            engine: engine,
            name: name,
            description: description,
            system_content: system_content,
            user_content: user_content,
            assistant_content: assistant_content,
            tool_logo: tool_logo,
        })

        const updateResult = await Models.findById({ _id: req.body._id })
        res.json(updateResult)
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
