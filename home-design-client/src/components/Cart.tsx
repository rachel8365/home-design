import React, { FunctionComponent, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import { deleteProductFromCart, getCart } from "../services/cartService";
import { Link } from "react-router-dom";
import { successMsg } from "../services/feedbecksService";
import QuantitySelector from "./QuantitySelector";

interface CartProps { }

const Cart: FunctionComponent<CartProps> = () => {
    const [productsInCart, setProductsInCart] = useState<Product[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    useEffect(() => {
        getCart()
            .then((res) => {
                setProductsInCart(res.data);
                calculateTotalAmount(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const calculateTotalAmount = (cart: Product[]) => {
        const total = cart.reduce((acc, product) => {
            const quantity = product.quantity ?? 0;
            return acc + product.price * quantity;
        }, 0);
        setTotalAmount(total);
    };

    const handleQuantityChange = (id: string, newQuantity: number) => {
        setProductsInCart((prevProducts) => {
            const updatedProducts = prevProducts.map((product) =>
                product._id === id ? { ...product, quantity: newQuantity } : product
            );

            calculateTotalAmount(updatedProducts);
            return updatedProducts;
        });
    };

    const handleDelete = (id: string) => {
        if (window.confirm("את/ה בטוח/ה שברצונך למחוק את המוצר?")) {
            deleteProductFromCart(id)
                .then((res) => {
                    successMsg("המוצר נמחק בהצלחה");
                    setProductsInCart((prevProducts1) =>
                        prevProducts1.filter((product) => product._id !== id)
                    );
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <>
            <div className="container">
                <h3 className="display-3 mt-5 mb-5">סל קניות</h3>
                {productsInCart.length ? (
                    <div>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>תמונה</th>
                                    <th>שם המוצר</th>
                                    <th>קטגוריה</th>
                                    {/* <th>Description</th> */}
                                    <th>מחיר</th>
                                    <th>כמות</th>
                                    <th>הסרה</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productsInCart.map((product: Product) => (
                                    <tr key={product._id}>
                                        <td><img src={product.imageUrl} alt="image" style={{ width: "150px" }} /></td>
                                        <td>{product.title}</td>
                                        <td>{product.category}</td>
                                        {/*   <td>{product.description}</td> */}
                                        <td>{product.price}</td>
                                        <td className="selector">
                                            <QuantitySelector
                                                quantity={product.quantity}
                                                onIncrease={() => handleQuantityChange(product._id as string, (product.quantity ?? 0) + 1)}
                                                onDecrease={() => handleQuantityChange(product._id as string, Math.max((product.quantity ?? 0) - 1, 1))}
                                            />
                                        </td>
                                        <td>
                                            <Link
                                                to=""
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(product._id as string)}
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="amount">סך הכל לתשלום: {totalAmount} ₪</p>
                    </div>
                ) : (
                    <>
                        <p className="cartText">סל הקניות שלך ריק</p>
                        <div className="cart">
                            <i className="fa-solid fa-cart-arrow-down"></i>
                        </div>
                    </>
                )}
                <div className="row">
                    <Link to="/"><i className="fa-regular fa-circle-right mb-4"></i>  המשך לקנות  </Link>
                    <Link to="/purchase"><button className="btn btn-primary">מעבר לקופה</button></Link>
                </div>
            </div>
        </>
    );
};

export default Cart;
