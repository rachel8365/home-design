const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const Cart = require("../models/Cart")
const Product = require("../models/Product")
const joi = require("joi")

const productSchema = joi.object({
    title: joi.string().required().min(2),
    price: joi.number().required(),
    category: joi.string().required().min(2),
    description: joi.string().required().min(2),
    imageUrl: joi.string().required().min(2),
    _id: joi.string()
    // quantity: joi.number().required() 
});

//add product to cart - product details in body
router.post("/", auth, async (req, res) => {
    try {
        // 1. joi validation
        const { error } = productSchema.validate(req.body)
        if (error) return res.status(400).send(error)
        // 2. find user cart
        let cart = await Cart.findOne({ userId: req.payload._id, active: true });
        if (!cart)
            return res.status(404).send("No active cart available for this user");
        // 3. add product to products array
        let productToFind = cart.products.find((p) => p._id === req.body._id);
        if (productToFind) {
            // inc the quantity
            let indexToUpdate = cart.products.findIndex((p) => p._id == req.body._id);
            cart.products[indexToUpdate].quantity++;
            cart.markModified("products");
        } else {
            cart.products.push({ ...req.body, quantity: 1 });
        }

        await cart.save();

        // 4 . return a response
        res.status(201).send("Product added successfully to cart!");
    } catch (error) {
        res.status(400).send(error);
    }
});

// get cart by userId
router.get("/", auth, async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.payload._id, active: true });

        if (!cart)
            return res.status(404).send("No active cart available for this user");
        res.status(200).send(cart.products)
    } catch (error) {
        res.status(400).send(error);
    }
})

// get product by id
router.get("/:id", async (req, res) => {
    try {
        let product = await Cart.products.findOne(
            {
                _id: req.params.id
            }
        )
        res.status(200).send(product)
    } catch (error) {
        res.status(400).send(send(error))
    }
})

/* // delet product
router.delete("/:id", auth, async (req, res) => {
    try {
        // find and delete product
        let product = await Cart.product.findByIdAndDelete({ _id: req.params.id });
        if (!product) return res.status(404).send("No such product in cart");
        res.status(200).send("Product deleted successfully!")

    } catch (error) {
        res.status(400).send(error);
    }
}) */
// delete product from cart
router.delete("/:id", auth, async (req, res) => {
    try {
        const productId = req.params.id;
        const cart = await Cart.findOneAndUpdate(
            { userId: req.payload._id, active: true },
            { $pull: { products: { _id: productId } } },
            { new: true }
        );

        if (!cart) {
            return res.status(404).send("No active cart available for this user");
        }

        res.status(200).send("Product deleted successfully from the cart!");
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router