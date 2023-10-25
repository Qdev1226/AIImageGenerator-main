import FreeTokenModel from '../../models/freeTokenCountModel.js'

export const updateFreeTokenCount = async (req, res) => {
    try {
        const exist = await FreeTokenModel.findOne({})
        let result = await FreeTokenModel.findByIdAndUpdate({
            _id: exist._id,
        }, {
            count: Number(req.body.count)
        })

        if (result)
            res.status(200).json({ msg: 'success' })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

export const getFreeTokenCount = async (req, res) => {
    try {
        const result = await FreeTokenModel.findOne({})
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
