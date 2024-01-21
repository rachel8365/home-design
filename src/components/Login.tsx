import { FunctionComponent } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { errorMsg, successMsg } from "../services/feedbecksService";
import { checkUser, getTokenDetails } from "../services/userService";


interface LoginProps {
    setUserInfo: Function
}

const Login: FunctionComponent<LoginProps> = ({ setUserInfo }) => {
    let navigate = useNavigate()
    let formik = useFormik({
        initialValues: {
            email: "", password: ""
        },
        validationSchema: yup.object({
            email: yup.string().required().email("Please enter valid email!"),
            password: yup.string().required().min(8)
        }),
        onSubmit: (values) => {
            checkUser(values)
                .then((res) => {
                    navigate("/");
                    successMsg(`ברוכים הבאים:)  ${values.email}`)
                    sessionStorage.setItem(
                        "token",
                        JSON.stringify({
                            token: res.data
                        }));
                    const data = getTokenDetails()
                    sessionStorage.setItem("userInfo", JSON.stringify({
                        email: data.email,
                        isAdmin: data.isAdmin,
                        id: data._id
                    }));
                    setUserInfo(
                        JSON.parse(sessionStorage.getItem("userInfo") as string)
                    )


                }
                )
                .catch((err) => {
                    errorMsg("אחד מהנתונים שגוי")
                    console.log(err)
                });
        }
    })

    return (
        <div className="container text-center col-md-3">
            <h2 className="display-7 mt-5 mb-5">התחבר לאתר כדי לרכוש מהמבחר בחנות </h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="email"
                        className="form-control" id="floatingInput4" placeholder="name@example.com"
                        value={formik.values.email}
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    <label htmlFor="floatingInput4">אמייל *</label>
                    {formik.touched.email && formik.errors.email && <p className="text-danger">{formik.errors.email}</p>}
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


                <button disabled={!formik.isValid || !formik.dirty} type="submit" className="btn btn-primary mt-3 w-100">התחבר</button>
            </form>
            <Link to="/register">משתמש חדש? לחץ כאן כדי להירשם</Link>
        </div>

    )
}

export default Login;