import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { successMsg } from "../services/feedbecksService";
import SearchBar from "./SearchBar";
import Product from "../interfaces/Product";

interface NavbarProps {
    userInfo: any;
    setUserInfo: Function;
    setProducts: Dispatch<SetStateAction<Product[]>>
}

const Navbar: FunctionComponent<NavbarProps> = ({ userInfo, setUserInfo, setProducts }) => {
    const location = useLocation();
    let navigate = useNavigate()
    const handleSearch = (results: any[]) => {
        setProducts(results);
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg shadow">
                <div className="container-fluid">
                    <NavLink to="/products"><img src="/image/logo.png" alt="Logo" style={{ width: "170px", height: "100px", }} /></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="navbar-nav">
                            {userInfo.email == false && <>
                                <NavLink className="nav-link" to="/register">הרשמה</NavLink>
                                <NavLink className="nav-link" to="/login">התחברות</NavLink>
                            </>}
                            <NavLink className="nav-link" to="/favorites"><i className="fa-regular fa-heart"></i></NavLink>
                            {userInfo.email == false && <>
                                <NavLink className="nav-link" to="/login"><i className="fa-solid fa-cart-shopping"></i></NavLink>
                            </>}
                            {userInfo.email && <>
                                <NavLink className="nav-link" to="/cart"><i className="fa-solid fa-cart-shopping"></i></NavLink>
                            </>}
                            <NavLink className="nav-link" to="/">ראשי</NavLink>
                            <NavLink className="nav-link" to="/about">מי אנחנו?</NavLink>

                            {userInfo.email && (
                                <>
                                    <div>
                                        <img src="/image/user.png" alt="user" style={{ width: "50px", height: "50px" }} onClick={() => {
                                            alert("אתה בטוח שברצונך לצאת?")
                                            sessionStorage.removeItem("userInfo")
                                            sessionStorage.removeItem("token")
                                            setUserInfo({ email: false, role: false })
                                            navigate("/")
                                            successMsg("אינך מחובר , יש להתחבר כדי להוסיף מוצרים לעגלה")
                                        }} />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    {location.pathname === "/" && (
                        <div className="search">
                            <SearchBar onSearch={handleSearch} />
                        </div>
                    )}
                </div>

            </nav>
        </>
    )
}

export default Navbar;