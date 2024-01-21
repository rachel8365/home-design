import axios from "axios";
import _ from "lodash";
import Product from "../interfaces/Product";


let api: string = `${process.env.REACT_APP_API}/carts`;

// create cart
export function createCart(userId: string) {
    return axios.post(api, { userId, products: [], active: true })
}

// add to cart / update cart
export function addToCart(productToAdd: Product) {
    let product = _.pick(productToAdd, [
        "_id",
        "title",
        "category",
        "description",
        "price",
        "quantity",
        "imageUrl",

    ]);
    return axios.post(api, product, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string)
                .token,
        },
    });
}

// get cart by userId
export function getCart() {
    return axios.get(`${api}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

// get product by id
export function getProductById(id: string) {
    return axios.get(`${api}/${id}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

// delete product from cart
export function deleteProductFromCart(id: string) {
    return axios.delete(`${api}/${id}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}
