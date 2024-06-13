import {Header} from "./Header.jsx";

export const PageTemplate = ({ children }) => {
    return (
        <>
            <Header />
            <div className="pt-20 md:pt-24 px-4">
                <div className="flex justify-center items-center h-screen">
                    <h2 className='text-blue-600 text-2xl'>{children}</h2>
                </div>
            </div>
        </>
    )
}
