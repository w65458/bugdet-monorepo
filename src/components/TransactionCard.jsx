import {AdjustmentsHorizontalIcon} from "@heroicons/react/16/solid/index.js";
import {useEffect, useRef, useState} from "react";

export const TransactionCard = ({ category_icon, title, amount, date, description }) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef(null);
    const toogleMenu = () => {
      setMenuOpen(!menuOpen)
    }

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className=" relative bg-white shadow-md rounded-lg p-4 mr-2 flex items-center justify-between mb-4">
            <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-full">
                    <img src={category_icon} alt={title} className="w-6 h-6" />
                </div>
                <div className="ml-4">
                    <h4 className="font-semibold">{title}</h4>
                    <p className="text-gray-500">{description}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-lg font-semibold text-red-600">${amount}</p>
                <p className="text-gray-500">{date}</p>
            </div>
            <div className="relative" ref={menuRef}>
                <button onClick={toogleMenu}><AdjustmentsHorizontalIcon className='h-5 w-5'/></button>
            </div>
            {menuOpen && (
                <div className="absolute right-0 mt-40 bg-white rounded-md shadow-lg z-10 border">
                    <ul>
                        <li className="block px-4 py-2 text-gray-700 hover:bg-gray-100"><button>Edit</button></li>
                        <li className="block px-4 py-2 text-gray-700 hover:bg-gray-100"><button>Delete</button></li>
                    </ul>
                </div>
            )}

        </div>

    )
}
