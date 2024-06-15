import {Header} from "./Header.jsx";
import {Footer} from "./Footer.jsx";

export const PageTemplate = ({ children }) => {
    return (
        <>
            <Header />
            <div className="mt-16 bg-red-600">
                  {children}
            </div>
            <Footer/>
        </>
    )
}
