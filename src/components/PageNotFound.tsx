import { FunctionComponent } from "react";

interface PageNotFoundProps {

}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
    return (
        <>
            <div className="container mt-5 mb-5">
                <h2 className="display-2">!oops</h2>
                <h3 className="display-1 ">PAGE NOT FOUND</h3>
            </div>

        </>
    )
}

export default PageNotFound;