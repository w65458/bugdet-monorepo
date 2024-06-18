import {Bars3BottomRightIcon, CurrencyEuroIcon, XMarkIcon} from "@heroicons/react/16/solid/index.js";
import {useState} from "react";

export const Header = () => {
    let Links =[
        {name: 'Panel główny', link: '/'},
        {name: 'Przychody', link: '/incomes'},
        {name: 'Wydatki', link: '/expenses'},
        {name: 'Cele', link: '/goals'},
        {name: 'Raporty', link: '/reports'},
    ]

    let [isOpen, setisOpen] = useState(false);

    return (
        <div className='shadow-md w-full fixed top-0 left-0 bg-white z-50'>
            <div className='md:px-10 py-4 px-7 md:flex justify-between items-center'>

                <div className='flex text-2xl cursor-pointer items-center gap-2'>
                    <CurrencyEuroIcon className='w-7 h-7 text-black'/>
                    <span className='font-bold text-blue-600'>MyMoneyApp</span>
                </div>

                <div onClick={() => setisOpen(!isOpen)} className='w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden'>
                    {
                        isOpen ? <XMarkIcon className='w-7 h-7'/> : <Bars3BottomRightIcon className='w-7 h-7'/>
                    }
                </div>

                <ul className={`md:flex  md:items-center  md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1]
                left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${isOpen ? 'top-16 opacity-100' : 'top-[-490px] md:opacity-100 opacity-0'}`}>
                    {
                        Links.map(link => (
                            <li key={link.name} className='font-semibold my-7 md:my-0 md:ml-8'>
                                <a href={link.link} className={`px-3 py-2 rounded-md ${location.pathname === link.link ? 'bg-blue-600 text-white' : 'text-black'}`}>
                                    {link.name}</a>
                            </li>))
                    }
                </ul>
            </div>
        </div>
    )
}

