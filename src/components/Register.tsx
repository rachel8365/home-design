import { FunctionComponent } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { addUser, getTokenDetails } from "../services/userService";
import { errorMsg, successMsg } from "../services/feedbecksService";

interface RegisterProps {
    setUserInfo: Function
}

const Register: FunctionComponent<RegisterProps> = ({ setUserInfo }) => {
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            phone: "",
            password: "",
            email: "",
            city: "",
            street: "",
            houseNumber: 0,
            isAdmin: false,
            favorites: [],
        },
        validationSchema: yup.object({
            firstName: yup.string().required().min(2),
            lastName: yup.string().required().min(2),
            phone: yup.string().required().min(9),
            password: yup.string().required().min(8),
            email: yup.string().required().email(),
            city: yup.string().required().min(2),
            street: yup.string().required().min(2),
            houseNumber: yup.number().required().min(2),
            isAdmin: yup.boolean(),
        }),
        onSubmit: (values) => {

            addUser({ ...values, favorites: [] })
                .then((res) => {
                    navigate("/")
                    successMsg(`:) ברוכים הבאים ${values.email}`)
                    sessionStorage.setItem("token", JSON.stringify({ token: res.data }))
                    const data = getTokenDetails()
                    sessionStorage.setItem("userInfo", JSON.stringify({
                        email: data.email,
                        isAdmin: data.isAdmin,
                        id: data._id
                    }))

                    setUserInfo(
                        JSON.parse(sessionStorage.getItem("userInfo") as string)
                    )
                })
                .catch((err) => {
                    console.log(err);
                    errorMsg("אחד מהנתונים שגוי")
                })
        }
    })
    return (
        <div className="container col-md-3 text-center mb-5">
            <h2 className="display-3 mb-5 text-center">הרשמה</h2>
            <form className="row" onSubmit={formik.handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="text"
                        className="form-control" id="floatingInput" placeholder="name@example.com"
                        value={formik.values.firstName}
                        name="firstName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    <label htmlFor="floatingInput">שם פרטי  *</label>
                    {formik.touched.firstName && formik.errors.firstName && <p className="text-danger">{formik.errors.firstName}</p>}
                </div>
                <div className="form-floating mb-3">
                    <input type="text"
                        className="form-control" id="floatingInput1" placeholder="name@example.com"
                        value={formik.values.lastName}
                        name="lastName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    <label htmlFor="floatingInput1">שם משפחה  *</label>
                    {formik.touched.lastName && formik.errors.lastName && <p className="text-danger">{formik.errors.lastName}</p>}
                </div>
                <div className="form-floating mb-3">
                    <input type="text"
                        className="form-control" id="floatingInput2" placeholder="name@example.com"
                        value={formik.values.phone}
                        name="phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    <label htmlFor="floatingInput2">טלפון  *</label>
                    {formik.touched.phone && formik.errors.phone && <p className="text-danger">{formik.errors.phone}</p>}
                </div>
                <div className="form-floating mb-3">
                    <input type="password"
                        className="form-control" id="floatingInput3" placeholder="name@example.com"
                        value={formik.values.password}
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    <label htmlFor="floatingInput3">סיסמה *</label>
                    {formik.touched.password && formik.errors.password && <p className="text-danger">{formik.errors.password}</p>}
                </div>
                <div className="form-floating mb-3">
                    <input type="email"
                        className="form-control" id="floatingInput4" placeholder="name@example.com"
                        value={formik.values.email}
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    <label htmlFor="floatingInput4">אמייל  *</label>
                    {formik.touched.email && formik.errors.email && <p className="text-danger">{formik.errors.email}</p>}
                </div>
                <div className="form-floating mb-3">
                    <input type="text"
                        className="form-control" id="floatingInput5" placeholder="name@example.com"
                        value={formik.values.city}
                        name="city"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    <label htmlFor="floatingInput5">עיר *</label>
                    {formik.touched.city && formik.errors.city && <p className="text-danger">{formik.errors.city}</p>}
                </div>
                <div className="form-floating mb-3">
                    <input type="text"
                        className="form-control" id="floatingInput6" placeholder="name@example.com"
                        value={formik.values.street}
                        name="street"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    <label htmlFor="floatingInput6">רחוב *</label>
                    {formik.touched.street && formik.errors.street && <p className="text-danger">{formik.errors.street}</p>}
                </div>
                <div className="form-floating mb-3">
                    <input type="number"
                        className="form-control" id="floatingInput8" placeholder="name@example.com"
                        value={formik.values.houseNumber}
                        name="houseNumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    <label htmlFor="floatingInput8">מספר בית *</label>
                    {formik.touched.houseNumber && formik.errors.houseNumber && <p className="text-danger">{formik.errors.houseNumber}</p>}
                </div>
                <button disabled={!formik.isValid || !formik.dirty} className="btn btn-success mb-4" type="submit">הירשם</button>
            </form>
            <button className="btn btn-danger col-md-6" onClick={() => navigate(-1)}>Cancel</button>
            <button className="btn btn-success col-md-6" onClick={() => formik.resetForm()}><i className="fa-solid fa-rotate"></i></button>
            <Link to="/login">כבר רשום אצלנו? לחץ כאן כדי להתחבר</Link>
        </div>
    )
}

export default Register;