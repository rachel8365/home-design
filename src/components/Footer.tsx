import { FunctionComponent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { successMsg } from "../services/feedbecksService";


interface FooterProps {
    userInfo: any
    setUserInfo: Function
}

const Footer: FunctionComponent<FooterProps> = ({ userInfo, setUserInfo }) => {
    let navigate = useNavigate();

    return (
        <>
            <div className="footerStyle">
                <footer className="py-5 pb-3 mt-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 text-center">
                                <img className="footerImg" src="/image/logo.png" alt="logo" />
                            </div>

                            <div className="col-md-2 mb-3" >
                                <h5>שירות לקוחות</h5>
                                <p className="nav flex-column">
                                    א-ה 10:00 - 22:00
                                </p>
                                <p className="nav flex-column">
                                    טלפון: 052-7648365
                                </p>
                                <p className="nav flex-column">
                                    לשליחת מייל לאתר
                                </p>
                                <p className="nav flex-column">
                                    (rv8365@gmail.com)
                                </p>



                                <p className="nav flex-column">
                                    לשליחת מייל לחנויות
                                </p>
                                <p className="nav flex-column">
                                    (homedesign@.co.il)
                                </p>
                            </div>

                            <div className=" col-md-2 mb-3">
                                <h5>תשמרו על קשר</h5>
                                <p className="nav flex-column">
                                    {userInfo.email == false && <>

                                        <NavLink className="nav-link" to="/register">הרשמה</NavLink>
                                        <NavLink className="nav-link" to="/login">התחברות</NavLink>
                                    </>}
                                    {userInfo.email && (
                                        <>

                                            <NavLink className="nav-link" onClick={() => {
                                                alert("אתה בטוח שברצונך לצאת?");
                                                sessionStorage.removeItem("userInfo");
                                                setUserInfo({ email: false });
                                                successMsg("אינך מחובר , יש להתחבר כדי להוסיף מוצרים לעגלה")
                                            }} to="/">ליציאה</NavLink>

                                        </>
                                    )}
                                </p>
                            </div>

                            <div className="col-md-4 offset-md-1 mb-3">
                                <form>
                                    <h5>הישארו מעודכנים</h5>
                                    <p>הרשמו לניוזלטר והיו הראשונים לדעת על מבצעים.</p>
                                    <div className="d-flex flex-column flex-sm-row ">
                                        <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                                        <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
                                        <button className="btn btn-secondary" type="button">Subscribe</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="d-flex flex-column flex-sm-row justify-content-between py-2 my-2 border-top">
                            <p>© 2023 Rachel Vinograd, Inc. All rights reserved.</p>
                            <ul className="list-unstyled d-flex">
                                <li className="ms-3">
                                    <i className="fa-brands fa-twitter fa-xl"></i>
                                </li>
                                <li className="ms-3">
                                    <i className="fa-brands fa-facebook-f fa-xl"></i>
                                </li>
                                <li className="ms-3">
                                    <i className="fa-brands fa-youtube fa-xl"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </footer >
            </div>

        </>
    )
}

export default Footer;