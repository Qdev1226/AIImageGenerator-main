import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Engines from '../../models/EngineModel.js'
dotenv.config()

export const getAllEngines = async (req, res) => {
    try {
        const engines = await Engines.find({}).populate('category').sort({ name: 1 })
        res.status(200).json({ data: engines });
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: err.message });
    }
}

export const getEngines = async (req, res) => {
    try {
        const category = req.body.category
        const page = req.body.page
        const limit = req.body.rowsPerPage
        const searchKey = req.body.searchKey
        let pattern = {}

        if (category == '-1') {
            if (searchKey == '') {
                pattern = {}
            } else {
                pattern = {
                    name: {
                        $regex: new RegExp(searchKey.toLowerCase(), "i")
                    }
                }
            }
        } else {
            if (searchKey == '') {
                pattern = {
                    category: category
                }
            } else {
                pattern = {
                    name: {
                        $regex: new RegExp(searchKey.toLowerCase(), "i")
                    },
                    category: category
                }
            }
        }

        const startIndex = (Number(page)) * limit
        const engines = await Engines.find(pattern).populate('category').sort({ _id: 1 }).limit(limit).skip(startIndex);
        const totalCount = await Engines.find(pattern).countDocuments()
        res.status(200).json({ data: engines, currentPage: Number(page), totalCount: totalCount });
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: err.message });
    }
}

export const addEngine = async (req, res) => {
    const { name, type, engine_title, res_type, key1, value1, key2, value2, key3, value3, api, category } = req.body
    try {
        let result = await Engines.create({
            name: name,
            type: type,
            engine_title: engine_title,
            res_type: res_type,
            key1: key1,
            value1: value1,
            key2: key2,
            value2: value2,
            key3: key3,
            value3: value3,
            api: api,
            category: category
        })
        if (result)
            res.status(200).json({ msg: 'success' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
}

export const deleteEngine = async (req, res) => {
    const id = req.body.engineId
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No engine with that ID')
        await Engines.findByIdAndDelete({ _id: id })
        res.status(200).json({ msg: 'success' })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

export const updateEngine = async (req, res) => {
    try {
        let result = await Engines.findByIdAndUpdate({
            _id: req.body._id,
        }, {
            name: req.body.name,
            type: req.body.type,
            engine_title: req.body.engine_title,
            res_type: req.body.res_type,
            key1: req.body.key1,
            value1: req.body.value1,
            key2: req.body.key2,
            value2: req.body.value2,
            key3: req.body.key3,
            value3: req.body.value3,
            api: req.body.api,
            category: req.body.category
        })

        if (result)
            res.status(200).json({ msg: 'success' })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
