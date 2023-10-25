import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Filters from '../../models/FilterModel.js'
dotenv.config()

export const getFilters = async (req, res) => {
    try {
        const page = req.body.page
        const limit = req.body.rowsPerPage
        const searchKey = req.body.searchKey
        const pattern = searchKey == '' ? { deleted_at: null } : {
            $and: [
                {
                    deleted_at: null
                },
                {
                    $or: [
                        {
                            name: {
                                $regex: new RegExp(searchKey.toLowerCase(), "i")
                            }
                        },
                        {
                            prompt: {
                                $regex: new RegExp(searchKey.toLowerCase(), "i")
                            }
                        }
                    ]
                }
            ]
        }
        const startIndex = (Number(page)) * limit
        const filters = await Filters.find(pattern).sort({ _id: 1 }).limit(limit).skip(startIndex);
        const totalCount = await Filters.find(pattern).countDocuments()
        res.status(200).json({ data: filters, currentPage: Number(page), totalCount: totalCount });
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: err.message });
    }
}

export const addFilter = async (req, res) => {
    const { name, prompt, avatar } = req.body

    try {
        const existingFilter = await Filters.findOne({ name })
        if (existingFilter) return res.status(401).json({ msg: "Filter already exist." })

        // create a new filter with default values
        const result = await Filters.create({
            name: name,
            prompt: prompt,
            avatar: avatar,
            created_at: new Date
        })

        const totalCount = await Filters.find({}).countDocuments()
        res.status(200).json({ newFilter: result, totalCount: totalCount })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
}

export const deleteFilter = async (req, res) => {
    const id = req.body.filterId
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No filter with that ID')
        const updateResult = await Filters.findByIdAndUpdate({ _id: id }, { deleted_at: new Date })
        res.json({ msg: 'Filter deleted successfully' })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

export const updateFilter = async (req, res) => {
    try {
        await Filters.findByIdAndUpdate({
            _id: req.body._id,
        }, {
            name: req.body.name,
            prompt: req.body.prompt,
            avatar: req.body.avatar
        })

        const updateResult = await Filters.findById({ _id: req.body._id })
        res.json(updateResult)
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
