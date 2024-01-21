import { FunctionComponent, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../services/productsService";
import Product from "../interfaces/Product";
import { successMsg } from "../services/feedbecksService";


interface UpdateProductProps {

}

const UpdateProduct: FunctionComponent<UpdateProductProps> = () => {
    let { id } = useParams()
    let navigate = useNavigate()
    useEffect(() => {
        getProductById(id as string)
            .then((res) => setProduct(res.data))
            .catch((err) => console.log(err)
            )
    }, []);
    let [product, setProduct] = useState<Product>({
        title: "", subtitle: "", description: "", options: "", category: "", price: 0, imageUrl: "", imageAlt: ""
    });
    let formik = useFormik({
        initialValues: {
            title: product.title,
            subtitle: product.subtitle,
            description: product.description,
            options: product.options,
            category: product.category,
            price: product.price,
            imageUrl: product.imageUrl,
            imageAlt: product.imageAlt
        },
        enableReinitialize: true,
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
        onSubmit: (values) => {
            updateProduct(values, id as string)
                .then((res) => {
                    navigate("/")
                    successMsg("עדכון המוצר בוצע בהצלחה")
                })
                .catch((err) => console.log(err)
                )
        }
    })

    return (
        <>
            <h1 className="display-2">עדכון מוצר</h1>
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
                        <label htmlFor="floatingInputDisabled">קטגוריות</label>
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
                        <label htmlFor="floatingInputDisabled">כיתוב לתמונה</label>
                        {formik.touched.imageAlt && formik.errors.imageAlt && (
                            <p className="text-danger">{formik.errors.imageAlt}</p>
                        )}
                    </div>
                    <button className="btn btn-primary w-100" disabled={!formik.isValid || !formik.dirty} type="submit" >עדכון</button>

                </form>
                <button className="btn btn-danger w-100" onClick={() => navigate(-1)}>חזרה</button>
            </div>

        </>
    )
}

export default UpdateProduct;