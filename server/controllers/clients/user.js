import jwt from "jsonwebtoken"
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

import { validateLoginInput, validateRegisterInput } from '../../validations/clients/users.js';
import { ROLE_IDX_FREE, ROLE_IDX_19, ROLE_IDX_29 } from "./role.js"
import RoleModel from "../../models/RoleModel.js"
import UserModel from '../../models/userModel.js'
import SaleModel from "../../models/SaleModel.js"
import { addMonths } from "../../utils/date.js"

dotenv.config()
const SECRET = process.env.SECRET;
const HOST = process.env.SMTP_HOST
const PORT = process.env.SMTP_PORT
const USER = process.env.SMTP_USER
const PASS = process.env.SMTP_PASS

export const signin = async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid)
        return res.status(400).json(errors);

    const { email, password } = req.body // Coming from formData
    try {
        const existingUser = await UserModel.findOne({ email })
        if (!existingUser) return res.status(400).json({ email: 'This email is not exist.' });

        if (existingUser.password) {
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
            if (!isPasswordCorrect) return res.status(400).json({ password: "Password is incorrect." })
        }

        // If crednetials are valid, create a token for the user
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET, { expiresIn: "24h" })

        // Then send the token to the client/frontend
        res.status(200).json({ user: existingUser, token })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error })
    }
}

export const signup = async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid)
        return res.status(400).json(errors)

    const { email, password, firstName, lastName } = req.body

    try {
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) return res.status(400).json({ email: "User already exist." })

        const hashedPassword = await bcrypt.hash(password, 12)
        const role = await getRoleByIdx(ROLE_IDX_FREE);
        const result = await UserModel.create({
            email: email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
            //role_id: role._id,
            //role_idx: role.index,
            //remain_cnt: role.image_cnt,
            start_date: new Date(),
            end_date: addMonths(new Date(), 1)
        });

        const token = jwt.sign({ email: result.email, id: result._id }, SECRET, { expiresIn: "1h" })
        res.status(200).json({ user: result, token })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        res.status(200).json({ user: user, token: req.header('x-auth-token') });
    } catch (err) {
        console.log(err);
        res.status(401).json({ msg: 'Incorrect User' });
    }
}

export const signinGoogle = async (req, res) => {
    const { sub, name, given_name, family_name, picture, email, email_verified, locate } = req.body;
    try {
        var existingUser = await UserModel.findOne({ email })
        if (!existingUser) {
            const userInfo = {
                name: name,
                email: email
            };

            // Register new user.
            const role = await getRoleByIdx(ROLE_IDX_FREE);
            existingUser = await UserModel.create({
                email: email,
                name: name,
                role_id: role._id,
                role_idx: role.index,
                remain_cnt: role.image_cnt,
                start_date: new Date(),
                end_date: addMonths(new Date(), 1),
                avatar: picture
            });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET, { expiresIn: "24h" })

        // Then send the token to the client/frontend
        res.status(200).json({ user: existingUser, token })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const getRoleByIdx = async (idx) => {
    try {
        var role = await RoleModel.findOne({ index: idx }).exec();
        return role;
    } catch (error) {
        console.log(error);
        return null;
    }
}


export const forgotPassword = (req, res) => {

    const { email } = req.body

    // NODEMAILER TRANSPORT FOR SENDING POST NOTIFICATION VIA EMAIL
    const transporter = nodemailer.createTransport({
        host: HOST,
        port: PORT,
        auth: {
            user: USER,
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
        User.findOne({ email: email })
            .then(user => {
                if (!user) {
                    return res.status(422).json({ error: "User does not exist in our database" })
                }
                user.resetToken = token
                user.expireToken = Date.now() + 3600000
                user.save().then((result) => {
                    transporter.sendMail({
                        to: user.email,
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
    User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
        .then(user => {
            if (!user) {
                return res.status(422).json({ error: "Try again session expired" })
            }
            bcrypt.hash(newPassword, 12).then(hashedpassword => {
                user.password = hashedpassword
                user.resetToken = undefined
                user.expireToken = undefined
                user.save().then((saveduser) => {
                    res.json({ message: "password updated success" })
                })
            })
        }).catch(err => {
            console.log(err)
        })
}

/**
 * @description
 *  Save sale history in db and change user's role.
 */
export const purchaseRole = async (req, res) => {
    const userId = req.userId;
    const roleId = req.body._id;
    const roleIdx = req.body.index;
    const imageCnt = req.body.image_cnt;
    const price = req.body.price;

    try {
        const sale = await SaleModel.create({
            user_id: userId,
            price: price,
            role_id: roleId,
            role_idx: roleIdx
        });

        const curUser = await changeUserRole(userId, roleId, roleIdx, imageCnt);
        res.status(200).json({ user: curUser })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err })
    }
}

const changeUserRole = async (userId, roleId, roleIdx, imageCnt) => {
    try {
        const curDate = new Date();
        const endDate = addMonths(new Date(), 1);

        const user = await UserModel.findOneAndUpdate({
            _id: userId
        }, {
            role_id: roleId,
            role_idx: roleIdx,
            remain_cnt: imageCnt,
            start_date: curDate,
            end_date: endDate
        });

        return user;
    } catch (err) {
        console.log(err);
        return null;
    }
}