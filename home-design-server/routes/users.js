const express = require("express")
const auth = require("../middleware/auth")
const User = require("../models/User")
const _ = require("lodash")
const joi = require("joi")
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
    favorites: joi.array().allow('')
})

/* // get all
router.get("/", auth, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users)
    } catch (error) {
        res.status(400).send(error)
    }
}); */

// get user by userId 
router.get("/:userId", auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('favorites')
        res.status(200).send(user)

    } catch (error) {
        res.status(400).send(error)
    }
})

// add product to array favorite
router.put("/:userId/:productId", auth, async (req, res) => {
    try {

        const user = await User.findById(req.params.userId)
        const existingIdx = user.favorites.findIndex(product => product.toString() == req.params.productId)

        if (existingIdx === -1) {
            user.favorites = [...user.favorites, req.params.productId]
        } else {
            let products = [...user.favorites]
            products.splice(products.findIndex(x => x == req.params.productId), 1)
            user.favorites = products
        }
        let updatedUser = await user.save()
        updatedUser = await User.findById(req.params.userId).populate("favorites")
        res.status(200).send(updatedUser)
    } catch (error) {
        res.status(400).send(error)
    }
});

//put
router.put("/:id", auth, async (req, res) => {
    try {

        // 1. joi validation
        const { error } = registerSchema.validate(req.body)
        if (error) return res.status(400).send(error)

        //2. check if user alredy exist
        let user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })

        if (!user) return res.status(400).send("User already exist")

        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

//delet user by id
router.delete("/:id", auth, async (req, res) => {
    try {
        // check if user is an admin or registered
        if (!req.payload.role == "Admin" && !req.payload._id == req.params.id)
            return res.status(400).send("Access denied. You do not have permission to delete")
        let user = await User.findByIdAndDelete({ _id: req.params.id })
        if (!user) return res.status(404).send("No such user")
        res.status(200).send("User deleted successfully!");
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router