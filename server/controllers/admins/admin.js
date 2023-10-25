import jwt from "jsonwebtoken"
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import { validateLoginInput, validateRegisterInput } from '../../validations/admins/admins.js';

dotenv.config()
const SECRET = process.env.SECRET;
const HOST = process.env.SMTP_HOST
const PORT = process.env.SMTP_PORT
const USER = process.env.SMTP_USER
const PASS = process.env.SMTP_PASS

import Admin from '../../models/AdminModel.js'

export const getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.adminId);
        res.status(200).json({ admin: admin, token: req.header('x-auth-token') });
    } catch (err) {
        console.log(err);
        res.status(401).json({ msg: 'Incorrect Admin' });
    }
}

export const signin = async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid)
        return res.status(400).json({ msg: 'Email or password is not validated.' })

    const { email, password } = req.body // Coming from formData
    try {
        const existingAdmin = await Admin.findOne({ email })
        if (!existingAdmin) return res.status(400).json({ msg: 'This email is not exist.' });

        const isPasswordCorrect = await bcrypt.compare(password, existingAdmin.password)
        if (!isPasswordCorrect) return res.status(400).json({ msg: "Password is incorrect." })

        // If crednetials are valid, create a token for the admin
        const token = jwt.sign({ email: existingAdmin.email, id: existingAdmin._id }, SECRET, { expiresIn: "1h" })

        // Then send the token to the client/frontend
        res.status(200).json({ admin: existingAdmin, token })

    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export const signup = async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid)
        return res.status(400).json({ msg: 'Name or password is incorrect.' })

    const { email, password, confirmPassword, name } = req.body
    try {
        const existingAdmin = await Admin.findOne({ email })
        if (existingAdmin) return res.status(401).json({ msg: "User already exist." })

        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await Admin.create({ email, password: hashedPassword, name: name })
        const token = jwt.sign({ email: result.email, id: result._id }, SECRET, { expiresIn: "1h" })

        res.status(200).json({ admin: result, token })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


// export const updateProfile = async (req, res) => {
//     const formData = req.body
//     const { id: _id } = req.params
//     console.log(formData)

//     if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No admin with this id found')

//     const updatedAdmin = await Admin.findByIdAndUpdate(_id, formData, {new: true})
//     res.json(updatedAdmin)
// }




export const forgotPassword = (req, res) => {

    const { email } = req.body

    // NODEMAILER TRANSPORT FOR SENDING POST NOTIFICATION VIA EMAIL
    const transporter = nodemailer.createTransport({
        host: HOST,
        port: PORT,
        auth: {
            admin: USER,
            pass: PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    })


    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err)
        }
        const token = buffer.toString("hex")
        Admin.findOne({ email: email })
            .then(admin => {
                if (!admin) {
                    return res.status(422).json({ error: "Admin does not exist in our database" })
                }
                admin.resetToken = token
                admin.expireToken = Date.now() + 3600000
                admin.save().then((result) => {
                    transporter.sendMail({
                        to: admin.email,
                        from: "Accountill <hello@accountill.com>",
                        subject: "Password reset request",
                        html: `
                    <p>You requested for password reset from Arc Invoicing application</p>
                    <h5>Please click this <a href="https://accountill.com/reset/${token}">link</a> to reset your password</h5>
                    <p>Link not clickable?, copy and paste the following url in your address bar.</p>
                    <p>https://accountill.com/reset/${token}</p>
                    <P>If this was a mistake, just ignore this email and nothing will happen.</P>
                    `
                    })
                    res.json({ message: "check your email" })
                }).catch((err) => console.log(err))

            })
    })
}



export const resetPassword = (req, res) => {
    const newPassword = req.body.password
    const sentToken = req.body.token
    Admin.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
        .then(admin => {
            if (!admin) {
                return res.status(422).json({ error: "Try again session expired" })
            }
            bcrypt.hash(newPassword, 12).then(hashedpassword => {
                admin.password = hashedpassword
                admin.resetToken = undefined
                admin.expireToken = undefined
                admin.save().then((savedadmin) => {
                    res.json({ message: "password updated success" })
                })
            })
        }).catch(err => {
            console.log(err)
        })
}
