import {Header} from "./Header.jsx";
import {Footer} from "./Footer.jsx";

export const PageTemplate = ({ children }) => {
    return (
        <>
        <div className="flex flex-col h-[calc(100vh-5rem)] items-center mt-20 justify-center place-items-center w-full scrollbar-none">
         <Header />
            <div className="flex flex-col h-full bg-gray-100 items-center justify-center place-items-center w-full overflow-hidden scrollbar-none">
                {children}
            </div>
         <Footer />
        </div>
        </>
    )
}