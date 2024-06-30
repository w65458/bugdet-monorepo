import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";

export const TransactionCard = ({ category_icon, title, amount, date, description, amount_color, category }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (menuOpen && buttonRef.current && menuRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            menuRef.current.style.top = `${rect.bottom + window.scrollY}px`;
            menuRef.current.style.left = `${rect.left + window.scrollX}px`;
        }
    }, [menuOpen]);

    return (
        <div className="flex items-center justify-between mb-2 p-4 bg-white shadow-md rounded-lg">
            <div className="mr-6">
                {category}
            </div>
            <div className="flex-1">
                <div className="flex-1 mr-4">
                    <h4 className="font-semibold text-xs md:text-base lg:text-lg">{title}</h4>
                    <p className="text-gray-500 text-xs md:text-base lg:text-lg">{description}</p>
                </div>
            </div>
            <div className="flex-1">
                <p className={`text-xs sm:text-base md:text-base lg:text-lg font-semibold ${amount_color}`}>${amount}</p>
                <p className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg">{date}</p>
            </div>
            {/*<div className="hover:text-blue-600 p-2 flex-shrink-0" ref={buttonRef}>*/}
            {/*    <button onClick={toggleMenu}><AdjustmentsHorizontalIcon className='h-6 w-6' /></button>*/}
            {/*</div>*/}
            {/*{menuOpen && (*/}
            {/*    <div className="absolute bg-white rounded-md shadow-lg border mt-2 right-0" ref={menuRef}>*/}
            {/*        <ul className='flex flex-col'>*/}
            {/*            <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm md:text-base lg:text-lg"><button>Edit</button></li>*/}
            {/*            <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm md:text-base lg:text-lg"><button>Delete</button></li>*/}
            {/*        </ul>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};
