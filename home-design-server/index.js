const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const register = require("./routes/register")
const login = require("./routes/login")
const users = require("./routes/users")
const products = require("./routes/products")
const carts = require("./routes/carts")
const morgan = require("morgan")


const cors = require("cors")

const app = express();
const port = process.env.PORT || 3000;


mongoose
    .connect(process.env.DB, { useNewUrlParser: true })
    .then(() => console.log("mongoDB connected"))
    .catch((err) => console.log(err))

app.use(express.json());
app.use(cors());
app.use(morgan('combined'))
app.use("/api/register", register)
app.use("/api/login", login)
app.use("/api/users", users)
app.use("/api/products", products)
app.use("/api/carts", carts)




app.listen(port, () => console.log("Server started on port", port))