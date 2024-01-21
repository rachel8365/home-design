import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface PurchaseProps {

}

const Purchase: FunctionComponent<PurchaseProps> = () => {
    return (
        <>
            <div className="container mt-5 mb-5">
                <h2 className="display-5">מערכת הסליקה בבניה </h2>
                <h2 className="display-5">ניתן לבצע הזמנה טלפונית בטלפון מס': 02-50007474</h2>
                <h2 className="display-5">תודה על הסבלנות </h2>
                <div className="row">
                    <i className="fa-solid fa-hands-praying mb-4 mt-3" style={{ fontSize: "8rem" }}></i>
                    <Link to="/cart"><i className="fa-regular fa-circle-right"></i>  חזור לסל הקניות</Link>
                </div>
            </div>
        </>
    )
}

export default Purchase;