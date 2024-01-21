import axios from "axios";
import Product from "../interfaces/Product";

let api: string = `${process.env.REACT_APP_API}/products`;

// get all products
export function getProducts() {
    return axios.get(api)
}

// get product by id
export function getProductById(id: string) {
    return axios.get(`${api}/${id}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

// add product
export function addProduct(newProduct: Product) {
    return axios.post(api, newProduct, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}


// update product
export function updateProduct(updatedProduct: Product, id: string) {
    return axios.put(`${api}/${id}`, updatedProduct, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

// delete product
export function deleteProduct(id: string) {
    return axios.delete(`${api}/${id}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

// get product details
export function getProductDetails(id: string) {
    return axios.get(`${api}/details/${id}`)
}

// search products by title
export function searchProducts(query: string) {
    return axios.get(`${api}/search?query=${query}`);
}

// get product by category
export function getProductByCategory(category: string) {
    return axios.get(`${api}/by/${category}`);
}