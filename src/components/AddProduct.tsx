import { useFormik } from "formik";
import { FunctionComponent, useEffect } from "react";
import * as yup from "yup"
import { addProduct } from "../services/productsService";
import { errorMsg, successMsg } from "../services/feedbecksService";
import { useNavigate } from "react-router-dom";


interface AddProductProps {
    productsChanged: boolean;
    setProductsChanged: Function;
}

const AddProduct: FunctionComponent<AddProductProps> = ({ productsChanged, setProductsChanged }) => {
    let navigate = useNavigate()
    let formik = useFormik({
        initialValues: { title: "", subtitle: "", description: "", options: "", category: "", price: 0, imageUrl: "", imageAlt: "" },
        validationSchema: yup.object({
            title: yup.string().required().min(2),
            subtitle: yup.string(),
            description: yup.string().required().min(2),
            options: yup.string(),
            category: yup.string().required().min(2),
            price: yup.number().required(),
            imageUrl: yup.string().required().min(2),
            imageAlt: yup.string().required().min(2)
        }),
        onSubmit: (values, { resetForm }) => {
            addProduct(values)
                .then((res) => {
                    setProductsChanged(!productsChanged)
                    resetForm();
                    formik.setFieldValue("price", "");
                    successMsg("המוצר נוסף בהצלחה")
                    navigate("/")
                })

                .catch((err) => {
                    errorMsg("יש לבדוק שוב את הנתונים")
                    console.log(err)
                }

                )
        }
    });
    useEffect(() => {
        formik.setFieldValue("price", "")
    }, []);
    return (
        <>
            <h1 className="display-2">הוספת מוצר חדש</h1>
            <div className="container col-md-4">
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-floating mb-3">
                        <input type="text"
                            className="form-control"
                            id="floatingInputDisabled"
                            placeholder="title"
                            name="title"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingInputDisabled">כותרת</label>
                        {formik.touched.title && formik.errors.title && (
                            <p className="text-danger">{formik.errors.title}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text"
                            className="form-control"
                            id="floatingInputDisabled"
                            placeholder="subtitle"
                            name="subtitle"
                            onChange={formik.handleChange}
                            value={formik.values.subtitle}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingInputDisabled">כותרת משנית</label>
                        {formik.touched.subtitle && formik.errors.subtitle && (
                            <p className="text-danger">{formik.errors.subtitle}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInputDisabled" placeholder="description"
                            name="description"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingInputDisabled">תאור</label>
                        {formik.touched.description && formik.errors.description && (
                            <p className="text-danger">{formik.errors.description}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInputDisabled" placeholder="Options"
                            name="options"
                            onChange={formik.handleChange}
                            value={formik.values.options}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingInputDisabled">אופציות</label>
                        {formik.touched.options && formik.errors.options && (
                            <p className="text-danger">{formik.errors.options}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInputDisabled" placeholder="Category"
                            name="category"
                            onChange={formik.handleChange}
                            value={formik.values.category}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingInputDisabled">קטגוריה</label>
                        {formik.touched.category && formik.errors.category && (
                            <p className="text-danger">{formik.errors.category}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="number" className="form-control" id="floatingInputDisabled" placeholder="0"
                            name="price"
                            onChange={formik.handleChange}
                            value={formik.values.price}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingInputDisabled">מחיר</label>
                        {formik.touched.price && formik.errors.price && (
                            <p className="text-danger">{formik.errors.price}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInputDisabled" placeholder="ImageUrl"
                            name="imageUrl"
                            onChange={formik.handleChange}
                            value={formik.values.imageUrl}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="floatingInputDisabled">תמונה</label>
                        {formik.touched.imageUrl && formik.errors.imageUrl && (
                            <p className="text-danger">{formik.errors.imageUrl}</p>)}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInputDisabled" placeholder="ImageAlt"
                            name="imageAlt"
                            onChange={formik.handleChange}
                            value={formik.values.imageAlt}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingInputDisabled">כיתוב חילופי לתמונה</label>
                        {formik.touched.imageAlt && formik.errors.imageAlt && (
                            <p className="text-danger">{formik.errors.imageAlt}</p>
                        )}
                    </div>
                    <button className="btn btn-primary w-100" disabled={!formik.isValid || !formik.dirty} type="submit" >+ הוספה</button>
                </form>
                <button className="btn btn-danger col-md-6" onClick={() => navigate(-1)}>חזור</button>
                <button className="btn btn-success col-md-6" onClick={() => formik.resetForm()}><i className="fa-solid fa-rotate"></i></button>
            </div>

        </>
    )
}

export default AddProduct;