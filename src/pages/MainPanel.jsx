import {Header} from "../components/Header.jsx";

export const MainPanel = () => {
    return (
        <>
            <Header/>
            <div className="pt-20 flex justify-center items-center h-screen">
                <h2 className='text-blue-600 text-2xl'>Panel główny</h2>
            </div>
        </>
    )
}
