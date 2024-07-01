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
        <div className="flex items-center p-4 bg-white shadow-md rounded-lg">
            <div className="p-2">
                {category}
            </div>
            <div className="grow">
                    <h4 className="font-semibold text-xs text-whitemd:text-base lg:text-lg">{title}</h4>
                    <p className="text-gray-500 text-xs md:text-base lg:text-lg">{description}</p>
            </div>
            <div className="flex gap-4 p-2">
                <p className={`text-xs sm:text-base md:text-base lg:text-lg font-semibold ${amount_color}`}>${amount}</p>
                <p className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg">{date}</p>
            </div>
        </div>
    );
};
