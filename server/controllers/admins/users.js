import mongoose from 'mongoose'
import dotenv from 'dotenv'
// import bcrypt from 'bcryptjs'
// import Roles from '../../models/RoleModel.js'
import Users from '../../models/UserModel.js'
dotenv.config()


export const getUsers = async (req, res) => {
    try {
        const page = req.body.page
        const limit = req.body.rowsPerPage
        const searchKey = req.body.searchKey
        const pattern = searchKey == '' ? { deletedAt: null } : {
            $and: [
                {
                    deletedAt: null
                },
                {
                    $or: [
                        {
                            name: {
                                $regex: new RegExp(searchKey.toLowerCase(), "i")
                            }
                        },
                        {
                            email: {
                                $regex: new RegExp(searchKey.toLowerCase(), "i")
                            }
                        }
                    ]
                }
            ]
        }
        const startIndex = (Number(page)) * limit
        const users = await Users.find(pattern).sort({ _id: -1 }).limit(limit).skip(startIndex);
        const totalCount = await Users.find(pattern).countDocuments()
        res.status(200).json({ data: users, currentPage: Number(page), totalCount: totalCount });
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: err.message });
    }
}

// export const addUser = async (req, res) => {
//     const { errors, isValid } = validateRegisterInput(req.body);
//     if (!isValid)
//         return res.status(400).json({ msg: 'Name or password is incorrect.' })

//     const { email, password, confirmPassword, name, role_idx } = req.body

//     try {
//         const existingUser = await Users.findOne({ email })
//         if (existingUser) return res.status(401).json({ msg: "User already exist." })

//         // get role 
//         const roleData = await Roles.find({ index: Number(role_idx) })
//         const hashedPassword = await bcrypt.hash(password, 12)

//         // create a new user with default values
//         const result = await Users.create({
//             email: email,
//             password: hashedPassword,
//             name: name,
//             role_id: roleData[0]._id,
//             role_idx: roleData[0].index,
//             remain_cnt: roleData[0].image_cnt,
//             start_date: new Date,
//             end_date: addMonths(new Date, 1),
//             avatar: '',
//             created_at: new Date
//         })

//         const totalCount = await Users.find({}).countDocuments()
//         res.status(200).json({ newUser: result, totalCount: totalCount })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ msg: error })
//     }
// }

export const deleteUser = async (req, res) => {
    const id = req.body.userId
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that ID')
        const updateResult = await Users.findByIdAndUpdate({ _id: id }, { deletedAt: new Date })
        res.status(200).json({ msg: 'success' })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

// export const updateUser = async (req, res) => {
//     try {
//         const roleData = await Roles.find({ index: req.body.role_idx })

//         await Users.findByIdAndUpdate({
//             _id: req.body._id,
//         }, {
//             name: req.body.name,
//             email: req.body.email,
//             role_idx: req.body.role_idx,
//             role_id: roleData[0]._id,
//             remain_cnt: roleData[0].image_cnt,
//             start_data: new Date,
//             end_date: addMonths(new Date, 1),
//             follow_cnt: req.body.follow_cnt
//         })

//         const updateResult = await Users.findById({ _id: req.body._id })
//         res.json(updateResult)
//     } catch (error) {
//         res.status(500).json({ msg: error })
//     }
// }
