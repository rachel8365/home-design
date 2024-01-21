const express = require("express")
const joi = require("joi")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const Cart = require("../models/Cart")

const router = express.Router()

const registerSchema = joi.object({
    firstName: joi.string().required().min(2),
    lastName: joi.string().required().min(2),
    phone: joi.string().required().min(9),
    password: joi.string().required().min(8),
    email: joi.string().required().email(),
    city: joi.string().required().min(2),
    street: joi.string().required().min(2),
    houseNumber: joi.number().required().min(2),
    isAdmin: joi.boolean().allow(''),
    favorites: joi.array()
})

router.post("/", async (req, res) => {
    try {
        // 1. joi validation
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error)
        }
        // 2. check if user already exist
        let user = await User.findOne({ email: req.body.email })
        if (user) res.status(400).send("User already exist")

        // 3. create the user
        user = new User(req.body)

        // 4. encrypt the password
        let salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        // 5. save user
        await user.save()

        // 6. create user cart
        let cart = new Cart({ userId: user._id, products: [], active: true });

        await cart.save();

        // 7. create the token & response
        const token = jwt.sign(
            { _id: user._id, isAdmin: user.isAdmin, email: user.email },
            process.env.jwtKey
        )
        res.status(201).send(token)

    } catch (error) {
        res.status(400).send(error)
    }
})
module.exports = router 