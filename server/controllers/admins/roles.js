import dotenv from 'dotenv'
dotenv.config()
const SECRET = process.env.SECRET;
const HOST = process.env.SMTP_HOST
const PORT = process.env.SMTP_PORT
const USER = process.env.SMTP_USER
const PASS = process.env.SMTP_PASS

import Roles from '../../models/RoleModel.js'

export const getRoles = async (req, res) => {
    try {
        const roles = await Roles.find()
        res.status(200).json(roles);
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: err.message });
    }
}

export const updateRole = async (req, res) => {
    const index = req.body.role
    const models = req.body.checkedModelIds
    console.log(index)
    console.log(models)

    try {
        await roles.findOneAndUpdate({
            index: index,
        }, {
            models: models
        })

        const updateResult = await Models.find({ index: index })
        res.json(updateResult[0])
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}