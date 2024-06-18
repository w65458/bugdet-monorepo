import { Typography } from "@material-tailwind/react";

export function Footer() {
    return (
        <footer className="shadow-md flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white py-6 px-6 text-center md:justify-between inset-x-0 bottom-0">
            <Typography color="blue-gray" className="font-normal">
                <div className='flex cursor-pointer items-center gap-2'>
                    <span className='font-bold text-blue-600'>MyMoneyApp</span>
                    &copy;
                </div>
            </Typography>
            <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                <li>
                    <Typography
                        as="a"
                        href="/"
                        color="blue-gray"
                        className="font-normal transition-colors hover:text-blue-600 focus:text-blue-600"
                    >
                        Panel główny
                    </Typography>
                </li>
                <li>
                    <Typography
                        as="a"
                        href="/incomes"
                        color="blue-gray"
                        className="font-normal transition-colors hover:text-blue-600 focus:text-blue-600"
                    >
                        Przychody
                    </Typography>
                </li>
                <li>
                    <Typography
                        as="a"
                        href="/expenses"
                        color="blue-gray"
                        className="font-normal transition-colors hover:text-blue-600 focus:text-blue-600"
                    >
                        Wydatki
                    </Typography>
                </li>
                <li>
                    <Typography
                        as="a"
                        href="/goals"
                        color="blue-gray"
                        className="font-normal transition-colors hover:text-blue-600 focus:text-blue-600"
                    >
                        Cele
                    </Typography>
                </li>
                <li>
                    <Typography
                        as="a"
                        href="/reports"
                        color="blue-gray"
                        className="font-normal transition-colors hover:text-blue-600 focus:text-blue-600"
                    >
                        Raporty
                    </Typography>
                </li>
            </ul>
        </footer>
    );
}