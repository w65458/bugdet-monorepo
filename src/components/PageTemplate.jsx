import {Header} from "./Header.jsx";
import {Footer} from "./Footer.jsx";

export const PageTemplate = ({ children }) => {
    return (
        <>
        <div className="bg-black flex flex-col h-full">
         <Header />
            <div className="pt-16">
                {children}
            </div>
         <Footer />
        </div>
        </>
    )
}