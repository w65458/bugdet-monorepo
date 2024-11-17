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
        <div className="flex items-center p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <div className="p-2 text-black dark:text-gray-300" style={{minWidth: '150px'}}>
                {category}
            </div>
            <div className="flex-grow p-2">
                <h4 className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg text-black dark:text-gray-100">{title}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg">{description}</p>
            </div>
            <div className="flex flex-col items-end p-2 gap-2">
                <p className={`text-xs sm:text-sm md:text-base lg:text-lg font-semibold ${amount_color}`}>{amount} zł</p>
                <p className="text-gray-500 dark:text-gray-400 w-[105px] text-xs sm:text-sm md:text-base lg:text-lg">{date}</p>
            </div>
        </div>
    );
};
