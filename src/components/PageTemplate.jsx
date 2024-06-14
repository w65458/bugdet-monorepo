import {Header} from "./Header.jsx";
import {Footer} from "./Footer.jsx";

export const PageTemplate = ({ children }) => {
    return (
        <>
            <Header />
            <div className=" md:pt-24 px-4">
                <div className="">
                    <h2 className='text-blue-600 text-2l'>{children}</h2>
                </div>
            </div>
            <Footer/>
        </>
    )
}
