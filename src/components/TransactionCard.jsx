import { AdjustmentsHorizontalIcon } from "@heroicons/react/16/solid/index.js";
import { useEffect, useRef, useState } from "react";

export const TransactionCard = ({ category_icon, title, amount, date, description, amount_color }) => {
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
        <div className="bg-white shadow-md rounded-lg p-4 mr-2 flex items-center justify-between mb-4">
            <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-full hidden lg:block">
                    <img src={category_icon} alt={title} className="w-6 h-6" />
                </div>
                <div className="ml-4">
                    <h4 className="font-semibold text-xs sm:text-base md:text-base">{title}</h4>
                    <p className="text-gray-500 text-xs sm:text-base md:text-base lg:text-lg">{description}</p>
                </div>
            </div>
            <div className="text-right">
                <p className={`text-xs sm:text-base md:text-base lg:text-lg font-semibold ${amount_color}`}>${amount}</p>
                <p className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg">{date}</p>
            </div>
            <div className="hover:text-blue-600 p-2" ref={buttonRef}>
                <button onClick={toggleMenu}><AdjustmentsHorizontalIcon className='h-5 w-5' /></button>
            </div>
            {menuOpen && (
                <div className="absolute bg-white rounded-md shadow-lg border" ref={menuRef}>
                    <ul className='flex flex-col'>
                        <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm md:text-base lg:text-lg"><button>Edit</button></li>
                        <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm md:text-base lg:text-lg"><button>Delete</button></li>
                    </ul>
                </div>
            )}
        </div>
    );
};
