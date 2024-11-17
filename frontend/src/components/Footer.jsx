import { Typography } from "@material-tailwind/react";

export function Footer() {
    return (
        <footer className="h-20 shadow-md flex w-full flex-row flex-wrap items-center justify-center place-items-center gap-y-6 gap-x-12 bg-white dark:bg-gray-800 py-6 px-6 text-center md:justify-between">
            <Typography color="blue-gray" className="font-normal hidden md:block">
                <div className='flex cursor-pointer items-center gap-2'>
                    <span className='font-bold text-blue-600 dark:text-blue-400'>BudgetApp</span>
                    <span className='font-normal text-gray-400 dark:text-gray-300 text-sm'>
                        &copy; 2024 All rights reserved.
                    </span>
                </div>
            </Typography>
        </footer>
    );
}
