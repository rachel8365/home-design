import { FunctionComponent, useEffect, useState } from "react";
import { deleteProduct, getProductByCategory } from "../services/productsService";
import Product from "../interfaces/Product";
import { Link, useNavigate } from "react-router-dom";
import { successMsg } from "../services/feedbecksService";
import { UserInfo } from "../App";

interface AccessoriesProps {
    category: string;
    products: Product[]
    setProducts: Function
    productsChange: boolean
    setProductsChange: Function
    userInfo: UserInfo
}

const Accessories: FunctionComponent<AccessoriesProps> = ({ category, products, setProducts, productsChange, setProductsChange, userInfo }) => {
    let navigate = useNavigate();

    useEffect(() => {
        getProductByCategory(category)
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err));
    }, [productsChange])

    let render = () => {
        setProductsChange(!productsChange);
    }

    let handleDelete = (id: string) => {
        if (window.confirm("Are you sure?")) {
            deleteProduct(id)
                .then((res) => {
                    successMsg("המוצר נמחק ");
                    render();
                })
                .catch((err) => console.log(err));
        }
    }
    return (<>
        <div className="container">
            <h3 className="display-3 mt-5 mb-5">{category}</h3>
            <h4>הוסיפ את הטאצ' הסופי לבית שלכם.. </h4>
            <h6>אקססוריז לבית יכולים לשנות כל חלל מגורים, ולהוסיף טאצ’ של סגנון. לשפר נוחות, ולהגדיל פונקציונליות (אולי לא תאמינו, אבל לא תמיד מה שאופנתי הוא גם לא נוח ולא שימושי). אנשים רבים מזלזלים ביכולת ובכוח של חפצים ואביזרים, לייצר אווירה של בית מסביר פנים ויפה. אבל אם אתם מבינים את הפוטנציאל שטמון בפרטים הקטנים, בטח גם אתם לא יכולים לחיות בלעדיהם.</h6>

            {products.length ? (
                <div className="container">
                    <div className="row">
                        {products.map((product: Product) => (
                            <div
                                key={product._id}
                                className="card col-md-4 mx-2 mt-4"
                                style={{ width: "18rem" }}
                            >
                                <img
                                    src={product.imageUrl}
                                    style={{ width: "16.5rem", height: "16rem" }}
                                    className="card-img-top"
                                    onClick={() => navigate(`/products/details/${product._id}`)}
                                    alt={product.title}
                                />
                                <div className="card-body text-center" style={{ color: "#947427" }}>
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">{product.description}</p>
                                </div>
                                <div className="card-body">
                                    {/* <h6 className="card-subtitle mb-2 text-muted">
                                        {product.category}
                                    </h6> */}
                                    <p className="card-text text-success">{product.price} ₪</p>

                                    {userInfo.isAdmin && (
                                        <>
                                            <Link to={`/products/update/${product._id}`} className="btn btn-warning mx-2">
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </Link>
                                            <Link
                                                to=""
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(product._id as string)}
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </Link>
                                        </>
                                    )}


                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>No products</p>
            )}
        </div>
    </>);
}

export default Accessories;