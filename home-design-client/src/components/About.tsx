import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface AboutProps {
    userInfo: any
}

const About: FunctionComponent<AboutProps> = ({ userInfo }) => {
    return (
        <>
            <div className="aboutStyle mb-5 mt-5">
                <h5 className="display-1 text-center">אודות</h5>
                <p className="container backGround col-md-6 p-5 d-flex text-center" style={{ fontSize: "1.4rem" }}>
                    בית הוא ההמשך הישיר שלכם. הוא אוגר בתוכו את הזיכרונות, המחשבות, האהבות והתקוות שלכם וזה המקום אליו תמיד תרצו להגיע בסופו של יום ארוך. הריהוט שבו אמו לשקף זאת ולעורר בכם את כל התחושות הללו. לכן מזנון אינו רק מקום אחסון כי אם המקום שבו נשמרים המזכרות שלכם מהטיול האחרון בחו"ל, מדף המטבח איננו רק מקום להניח בו את כוסות היין אלא הפינה המשקפת את טעמכם האישי (תרתי משמע) והספה איננה רק מקום ישיבה כי אם המקום אליו תרצו להגיע בסוף היום ולהרגיש עטופים ובטוחים.
                    אנו מזמינים אתכם להיכנס לאתר כדי לרכוש ממבחר הרהיטים והאקססוריז שבחנות
                </p>
                {userInfo.email == false &&
                    <Link to="/register">לחץ כאן כדי להירשם/ להתחבר לאתר</Link>
                }
                {userInfo.email && <Link to="/"><i className="fa-regular fa-circle-right"></i> עבור למוצרים </Link>}
            </div>

        </>
    )
}

export default About;