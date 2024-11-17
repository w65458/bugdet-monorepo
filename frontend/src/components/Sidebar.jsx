import {
    ArrowDownIcon,
    ArrowUpIcon,
    CurrencyEuroIcon,
    DocumentIcon,
    FlagIcon,
    HomeIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext.jsx';

export const Sidebar = ({ isOpen, setIsOpen }) => {
    const links = [
        { name: 'Panel główny', link: '/', icon: <HomeIcon className="h-6 w-6" /> },
        { name: 'Przychody', link: '/incomes', icon: <ArrowUpIcon className="h-6 w-6" /> },
        { name: 'Wydatki', link: '/expenses', icon: <ArrowDownIcon className="h-6 w-6" /> },
        { name: 'Cele', link: '/goals', icon: <FlagIcon className="h-6 w-6" /> },
        { name: 'Raporty', link: '/reports', icon: <DocumentIcon className="h-6 w-6" /> },
    ];

    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <div>
            <div className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static flex flex-col justify-between`}>

                <div>
                    <div className='flex items-center justify-between p-4 bg-blue-600 dark:bg-gray-700'>
                        <div className='flex items-center gap-2'>
                            <CurrencyEuroIcon className='w-6 h-6 text-white'/>
                            <span className='font-bold text-white text-xl'>BudgetApp</span>
                        </div>
                        <div className='md:hidden cursor-pointer' onClick={() => setIsOpen(false)}>
                            <XMarkIcon className='w-6 h-6 text-white' />
                        </div>
                    </div>

                    <ul className='p-4'>
                        {links.map(link => (
                            <li key={link.name} className='my-2'>
                                <Link to={link.link} className={`flex items-center p-2 rounded-md text-lg ${location.pathname === link.link ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-200'}`}>
                                    {link.icon}
                                    <span className="ml-4">{link.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-800 dark:text-gray-200">Tryb ciemny</span>
                        <div
                            onClick={toggleDarkMode}
                            className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 flex items-center ${darkMode ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                            <div className={`absolute w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${darkMode ? 'bg-white border-2 border-blue-500 translate-x-6' : 'bg-white border border-gray-400 translate-x-1'}`}></div>
                        </div>
                    </div>
                </div>
            </div>

            {isOpen && <div className="fixed inset-0 bg-black opacity-50 md:hidden" onClick={() => setIsOpen(false)}></div>}
        </div>
    );
};
