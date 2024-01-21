import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import { deleteProduct, getProducts } from "../services/productsService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { successMsg } from "../services/feedbecksService";
import { UserInfo } from "../App";

import { addProductToFav, getUserById } from "../services/userService";
import { AxiosResponse } from "axios";
import User from "../interfaces/User";

interface ProductsProps {
    userInfo: any;
    setUserInfo: Dispatch<SetStateAction<UserInfo>>;
    products: Product[]
    setProducts: Dispatch<SetStateAction<Product[]>>
    productsChange: boolean
    setProductsChange: Function
}

const Products: React.FC<ProductsProps> = ({ userInfo, products, setProducts, productsChange, setProductsChange }) => {

    let { category } = useParams()
    useEffect(() => {
        if (sessionStorage.getItem("token") === null || userInfo.id === undefined) {
            getProducts()
                .then(response => setProducts(response.data));
            return;
        }
        const promises = [
            getProducts() as Promise<AxiosResponse<Product[], any>>,
            getUserById(userInfo.id) as Promise<AxiosResponse<User, any>>
        ] as const;
        Promise.all(promises)
            .then(([productsResponse, userResponse]) => {
                setUser(userResponse.data)
                setProducts(productsResponse.data)
            })
            .catch(err => console.log(err))
    }, [userInfo.id, productsChange]);

    let render = () => {
        setProductsChange(!productsChange);
    };
    let handleDelete = (id: string) => {
        if (window.confirm("אתה בטוח שברצונך למחוק את המוצר?")) {
            deleteProduct(id)
                .then((res) => {
                    successMsg("המוצר נמחק בהצלחה");
                    render();
                })
                .catch((err) => console.log(err));
        }
    };



    // בודק האם המוצר שנבחר כבר נמצא במועדפים 
    const isFavorite = (someproductId: string | undefined) => {
        if (!someproductId) return false
        const userProducts = user?.favorites as Product[] ?? []
        return userProducts.findIndex(product => product._id === someproductId) !== -1
    }

    let addToFavorite = (product: Product) => {
        let id = JSON.parse(sessionStorage.getItem("userInfo") as string).id;
        if (product._id === undefined) { return; }
        const productId = product._id;
        let removed = false;

        // Ensure user.favorites is initialized as an array
        const userFavorites = user?.favorites || [];

        // הסרה מהמועדפים אם הכארד קיים 
        if (userFavorites.find(product => product._id === productId)) {
            removed = true;
            let products = [...userFavorites];
            let idx = userFavorites.findIndex(c => c._id === productId);
            products.splice(idx, 1);
            setUser({ ...user, favorites: products } as any);
        } else {
            //הוספה למועדפים 
            setUser({ ...user, favorites: [...userFavorites, product] } as any);
        }

        addProductToFav(id, productId)
            .then((res) => {
                successMsg(removed ? "המוצר הוסר מהמועדפים" : "נוסף למועדפים");
            })
            .catch((err) => console.log(err));
    };


    let navigate = useNavigate();
    let handleCategoryClick = (category: string) => {
        navigate(`/products/category/${category}`);
    };

    const furnituries = "image/furnituries.jpg";
    const accessories = "image/accessories.jpg";
    const gardenFurnitures = "image/garden.jpg";

    const [user, setUser] = useState<User | undefined>()


    return (
        <>
            <div className="container">
                <h1 className="display-1 mt-5 mb-5">ריהוט לבית</h1>
                <h3>ברוכים הבאים לחנות המקוונת שלנו, שבה חלומות הבית שלכם הופכים למציאות!</h3>
                <h4 className="display-7 mb-5">בית הוא ההמשך הישיר שלכם. הוא אוגר בתוכו את הזיכרונות, המחשבות, האהבות והתקוות שלכם וזה המקום אליו תמיד תרצו להגיע בסופו של יום ארוך. הריהוט שבו אמור לשקף זאת ולעורר בכם את כל התחושות הללו. לכן מזנון אינו רק מקום אחסון כי אם המקום שבו נשמרים המזכרות שלכם מהטיול האחרון בחו"ל, מדף המטבח איננו רק מקום להניח בו את כוסות היין אלא הפינה המשקפת את טעמכם האישי (תרתי משמע) והספה איננה רק מקום ישיבה כי אם המקום אליו תרצו להגיע בסוף היום ולהרגיש עטופים ובטוחים.</h4>
                <div className="container category">
                    <div className="row">
                        <div className=" col-md-4">
                            <h1 className="display-5 mt-2 mb-4">קנו לפי קטגוריה</h1>
                        </div>


                        <div className="imageCategory col-md-8 ">
                            <div className="row">
                                <div className="image-container col-md-4 mb-3">
                                    <img
                                        src={furnituries}
                                        alt="Furniture"
                                        style={{ width: "100%", height: "100%" }}
                                        onClick={() => handleCategoryClick("רהיטים")}
                                    />
                                </div>
                                <div className="image-container col-md-4 mb-3">
                                    <img
                                        src={gardenFurnitures}
                                        alt="Garden Furniture"
                                        style={{ width: "100%", height: "100%" }}
                                        onClick={() => handleCategoryClick("ריהוט-גן")}
                                    />
                                </div>
                                <div className="image-container col-md-4 mb-3">
                                    <img
                                        src={accessories}
                                        alt="Accessories"
                                        style={{ width: "100%", height: "100%" }}
                                        onClick={() => handleCategoryClick("אקססוריז")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <h1 className="display-2 mt-5 mb-5">מוצרים</h1>
                {userInfo.isAdmin && (
                    <Link to={"/products/new"} className="btn btn-success">
                        <i className="fa-solid fa-plus"></i>הוספת מוצר
                    </Link>
                )}
                {products.length ? (
                    <div className="container">
                        <div className="row">
                            {products.map((product: Product) => (
                                <div
                                    key={product._id}
                                    className="card col-md-4 mx-2 mt-3"
                                    style={{ width: "18rem" }}
                                >
                                    <div className="images">
                                        <img
                                            onClick={() => navigate(`/products/details/${product._id}`)}
                                            src={product.imageUrl}
                                            className="card-img-top"
                                            style={{ width: "17rem", height: "16.5rem" }}
                                            alt={product.title}
                                        />
                                    </div>
                                    <div className="card-body d-flex flex-column">
                                        <h6 className="card-subtitle mb-2 text-muted">
                                            {product.category}
                                        </h6>
                                        <h5 className="card-title">{product.title}</h5>
                                        <p className="card-text text-success mb-3">{product.price} ₪</p>
                                        <div className="card-body">
                                            {userInfo.email && (<>
                                                <div onClick={() => addToFavorite(product)}>
                                                    {!isFavorite(product._id) ?
                                                        (<i className="fa-solid fa-heart"></i>)
                                                        :
                                                        (<i className="fa-solid fa-heart" style={{ color: "#ff0000" }}></i>)}
                                                </div>
                                            </>)}
                                        </div>
                                        <div className="mt-auto">
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
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>No products</p>
                )}
            </div>
        </>
    );
};

export default Products;
