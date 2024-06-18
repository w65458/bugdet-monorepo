import {Header} from "./Header.jsx";
import {Footer} from "./Footer.jsx";

export const PageTemplate = ({ children }) => {
    return (
        <>
        <div className="flex flex-col h-screen">
         <Header />
            <div className="flex pt-16 grow justify-center bg-gray-100">
                {children}
            </div>
         <Footer />
        </div>
        </>
    )
}