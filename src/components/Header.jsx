import {Bars3BottomRightIcon, CurrencyEuroIcon, XMarkIcon} from "@heroicons/react/16/solid/index.js";
import {useState} from "react";

export const Header = () => {
    let Links =[
        {name: 'Panel główny', link: '/'},
        {name: 'Przychody', link: '/'},
        {name: 'Wydatki', link: '/'},
        {name: 'Cele', link: '/'},
        {name: 'Raporty', link: '/'},
    ]

    let [isOpen, setisOpen] = useState(false);

    return (
        <div className='shadow-md w-full fixed top-0 left-0'>
            <div className='md:px-10 py-4 px-7 md:flex justify-between items-center bg-white'>

                <div className='flex text-2xl cursor-pointer items-center gap-2'>
                    <CurrencyEuroIcon className='w-7 h-7 text-blue-600'/>
                    <span className='font-bold'>MyMoneyApp</span>
                </div>

                <div onClick={() => setisOpen(!isOpen)} className='w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden'>
                    {
                        isOpen ? <XMarkIcon/> : <Bars3BottomRightIcon/>
                    }
                </div>

                <ul className={`md:flex  md:items-center md:pb-0 pb-12 absolute md:static bg md:z-auto z-[-1]
                left-0 w-full md:w-auto md:pl-0 pl-9 transition-all bg-white duration-500 ease-in ${isOpen ? 'top-12' : 'top-[-490px]'}`}>
                    {
                        Links.map(link => (
                            <li className='font-semibold my-7 md:my-0 md:ml-8'>
                                <a href='/'>{link.name}</a>
                            </li>))
                    }
                </ul>
            </div>
        </div>
    )
}
