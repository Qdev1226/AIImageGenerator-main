import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Sales from '../../models/SaleModel.js'
dotenv.config()

export const getSales = async (req, res) => {
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
                            user_name: {
                                $regex: new RegExp(searchKey.toLowerCase(), "i")
                            }
                        },
                        {
                            user_email: {
                                $regex: new RegExp(searchKey.toLowerCase(), "i")
                            }
                        }
                    ]
                }
            ]
        }
        const startIndex = (Number(page)) * limit
        const sales = await Sales.find(pattern).sort({ _id: 1 }).limit(limit).skip(startIndex);
        const totalCount = await Sales.find(pattern).countDocuments()
        res.status(200).json({ data: sales, currentPage: Number(page), totalCount: totalCount });
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: err.message });
    }
}

export const deleteSale = async (req, res) => {
    const id = req.body._id
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No sale with that ID')
        const updateResult = await Sales.findByIdAndUpdate({ _id: id }, { deleted_at: new Date })
        res.json({ msg: 'Sale deleted successfully' })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}