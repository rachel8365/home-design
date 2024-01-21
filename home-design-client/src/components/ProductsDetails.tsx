import { FunctionComponent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Product from "../interfaces/Product";
import { getProductDetails } from "../services/productsService";
import { addToCart } from "../services/cartService";
import { successMsg } from "../services/feedbecksService";
import { UserInfo } from "../App";


interface ProductsDetailsProps {
    userInfo: UserInfo;
}

const ProductsDetails: FunctionComponent<ProductsDetailsProps> = ({ userInfo }) => {
    let { id } = useParams();
    let [productsDetails, setProductsDetails] = useState<Product>()
    useEffect(() => {
        if (id === undefined) { return }
        getProductDetails(id)
            .then((res) => {
                setProductsDetails(res.data)
            })
            .catch((err) => console.log(err)
            )
    }, []);

    let handleAddToCart = (productsDetails: Product | undefined) => {
        if (!productsDetails) { return }
        addToCart(productsDetails)
            .then((res) => successMsg("נוסף לעגלה"))
            .catch((err) => console.log(err)
            )
    };

    if (!productsDetails) {
        return <span>המוצר לא נמצא !</span>
    }

    return (<>
        <div className="container col-md-6 mt-5">
            <div className="card mb-3 p-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={productsDetails?.imageUrl} className="img-fluid rounded-start w-100" alt={productsDetails?.imageAlt} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="text-center">{productsDetails?.title}</h5>
                            <h3 className="card-text text-center"><small className="text-muted">{productsDetails?.subtitle}</small></h3>
                            <h6 className="card-text text-center">{productsDetails?.description}</h6>
                            <p className="text-center" >{productsDetails?.price}<i className="fa-solid fa-shekel-sign"></i></p>
                            {userInfo.email && <button className="btn btn-primary" onClick={() => handleAddToCart(productsDetails)}>
                                <i className="fa-solid fa-cart-shopping"></i>  הוסף לסל
                            </button>}
                            {userInfo.email == false && <button className="btn btn-primary"><Link to="/login" style={{ color: "#fff" }}>התחבר כדי להוסיף מוצרים לעגלה</Link></button>}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default ProductsDetails;