import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'
import bcrypt from 'bcryptjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import userRoutes from './routes/user-routes.js'
import adminRoutes from './routes/admin-routes.js'
import AdminModel from './models/AdminModel.js'
import FreeTokenCountModel from './models/FreeTokenCountModel.js'
import MembershipModel from './models/MembershipModel.js'

const app = express()
dotenv.config()

app.use((express.json({ limit: "30mb", extended: true })))
app.use((express.urlencoded({ limit: "30mb", extended: true })))
app.use((cors()))
app.use(express.static(path.join(__dirname, 'public')))
app.enable('trust proxy')

// Admin Routes
app.use('/api', adminRoutes);

// User Routes
app.use('/', userRoutes)

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

const DB_URL = process.env.DB_URL
const PORT = process.env.PORT
console.log("SERVER PORT : " + PORT);

// const seedUser = async () => {
//     let salt = bcrypt.genSaltSync(10);
//     let user = {
//         name: "NeillChan",
//         email: process.env.DB_ADMIN_EMAIL,
//         password: bcrypt.hashSync(process.env.DB_ADMIN_PASSWORD, salt)
//     }
//     let isExist = await AdminModel.findOne({ email: process.env.DB_ADMIN_EMAIL });
//     if (!isExist) {
//         let result = await AdminModel.create(user);
//         if (result) console.log("Created admin user!");
//     }
// }

const seedDefaultToken = async (count) => {
    let isExist = await FreeTokenCountModel.findOne({});
    if (!isExist) {
        let result = await FreeTokenCountModel.create({ count: count });
        if (result) console.log("Created default token count = " + count);
    }
}

const seedMembership = async () => {
    let isBasicExit = await MembershipModel.findOne({ membership: 0 });
    if (!isBasicExit)
        await MembershipModel.create({ title: process.env.BASIC_MEMBERSHIP_TITLE, membership: process.env.BASIC_MEMBERSHIP, tokens: process.env.BASIC_MEMBERSHIP_TOKEN, monthly_price: process.env.BASIC_MEMBERSHIP_MONTH, annual_price: process.env.BASIC_MEMBERSHIP_YEAR });

    let isIndividualExit = await MembershipModel.findOne({ membership: 1 });
    if (!isIndividualExit)
        await MembershipModel.create({ title: process.env.INDIVIDUAL_MEMBERSHIP_TITLE, membership: process.env.INDIVIDUAL_MEMBERSHIP, tokens: process.env.INDIVIDUAL_MEMBERSHIP_TOKEN, monthly_price: process.env.INDIVIDUAL_MEMBERSHIP_MONTH, annual_price: process.env.INDIVIDUAL_MEMBERSHIP_YEAR });

    let isProExit = await MembershipModel.findOne({ membership: 2 });
    if (!isProExit)
        await MembershipModel.create({ title: process.env.PRO_MEMBERSHIP_TITLE, membership: process.env.PRO_MEMBERSHIP, tokens: process.env.PRO_MEMBERSHIP_TOKEN, monthly_price: process.env.PRO_MEMBERSHIP_MONTH, annual_price: process.env.PRO_MEMBERSHIP_YEAR });
}

mongoose.connect(DB_URL, { dbName: "revolutionai", useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`)
        // seedUser();
        seedDefaultToken(process.env.DEFAULT_FREE_TOKEN)
        seedMembership()
    }))
    .catch((error) => console.log("Error : " + error.message))

console.log("_______________________________________________________");
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

