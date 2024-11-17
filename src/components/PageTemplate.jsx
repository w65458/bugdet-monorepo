import {Sidebar} from './Sidebar.jsx';
import {Footer} from './Footer.jsx';
import {useState} from "react";
import {Bars3BottomRightIcon} from "@heroicons/react/24/outline";

export const PageTemplate = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex h-screen">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="flex-grow flex flex-col">
                {!isOpen && (
                    <div className="md:hidden absolute top-4 left-4">
                        <button onClick={() => setIsOpen(true)} className="p-2 bg-blue-600 text-white rounded">
                            <Bars3BottomRightIcon className="w-6 h-6" />
                        </button>
                    </div>
                )}
                <div className="flex-grow h-full bg-gray-100 items-center justify-center place-items-center overflow-hidden scrollbar-none">
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    );
};
