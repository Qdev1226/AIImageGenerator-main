import MembershipModel from '../../models/MembershipModel.js'

export const updateMemberships = async (req, res) => {
    try {
        let memberships = req.body
        for (let i = 0; i < memberships.length; i++) {
            let item = memberships[i]
            await MembershipModel.findOneAndUpdate({
                membership: Number(item.membership),
            }, {
                monthly_price: Number(item.monthly_price),
                annual_price: Number(item.annual_price),
                tokens: Number(item.tokens),
            })
        }
        res.status(200).json({ msg: 'success' })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

export const getMemberships = async (req, res) => {
    try {
        const result = await MembershipModel.find({})
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
