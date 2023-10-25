import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Categories from '../../models/CategoryModel.js'
dotenv.config()

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Categories.find({}).sort({ name: 1 })
        res.status(200).json({ data: categories });
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: err.message });
    }
}

export const getCategories = async (req, res) => {
    try {
        const page = req.body.page
        const limit = req.body.rowsPerPage
        const searchKey = req.body.searchKey
        console.log(req.body)
        const pattern = searchKey == '' ? {} : {
            name: {
                $regex: new RegExp(searchKey.toLowerCase(), "i")
            }
        }
        const startIndex = (Number(page)) * limit
        const categories = await Categories.find(pattern).sort({ _id: 1 }).limit(limit).skip(startIndex);
        const totalCount = await Categories.find(pattern).countDocuments()
        res.status(200).json({ data: categories, currentPage: Number(page), totalCount: totalCount });
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: err.message });
    }
}

export const addCategory = async (req, res) => {
    const { name } = req.body
    try {
        let result = await Categories.create({
            name: name,
        })
        if (result)
            res.status(200).json({ msg: 'success' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
}

export const deleteCategory = async (req, res) => {
    const id = req.body.categoryId
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No category with that ID')
        await Categories.findByIdAndDelete({ _id: id })
        res.status(200).json({ msg: 'success' })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

export const updateCategory = async (req, res) => {
    try {
        let result = await Categories.findByIdAndUpdate({
            _id: req.body._id,
        }, {
            name: req.body.name
        })

        if (result)
            res.status(200).json({ msg: 'success' })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
