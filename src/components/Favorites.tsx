import { FunctionComponent, useEffect, useState } from "react";
import User from "../interfaces/User";
import { successMsg } from "../services/feedbecksService";
import { addProductToFav, getUserById } from "../services/userService";
import Product from "../interfaces/Product";


interface FavoritesProps {
    userInfo: any;
}

const Favorites: FunctionComponent<FavoritesProps> = ({ userInfo }) => {
    const [user, setUser] = useState<User | undefined>()
    useEffect(() => {
        if (userInfo.id === undefined) { return; }
        getUserById(userInfo.id)
            .then(res => setUser(res.data))
            .catch((err) => console.log(err))
    }, [userInfo.id]);

    let removeFavorits = (productId: string | undefined) => {
        if (!userInfo?.id || !productId) return
        if (user && user.favorites?.find(product => product._id === productId)) {
            let products = user.favorites
            let idx = user.favorites.findIndex(c => c._id === productId)
            products.splice(idx, 1)
            setUser({ ...user, favorites: products } as any)
        }

        addProductToFav(userInfo.id!, productId)
            .then((res) => {
                successMsg("המוצר הוסר מהמועדפים");
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <h1 className="display-3 text-center">מועדפים</h1>
            {user?.favorites?.length ? (
                <div className="container ">
                    <div className="row">
                        {user.favorites.map((product: Product) => (
                            <div key={product._id} className="card col-md-4 mx-3  mt-5 mb-5 border-raduse pt-2" style={{ width: "25rem" }} >
                                <img src={product.imageUrl} className="card-img-top" alt={product.imageAlt} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">{product.subtitle}</p>
                                </div>

                                <i className="fa-solid fa-heart" onClick={() => removeFavorits(product._id)} style={{ color: "#ff0000" }}></i>
                            </div>
                        ))}
                    </div>
                </div >
            ) : (<p className="display-4 text-center mt-5">אין מוצרים מועדפים </p >)
            }
        </>
    )
}

export default Favorites;