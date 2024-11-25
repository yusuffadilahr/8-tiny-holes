'use client'

import Link from "next/link";
import { useSelector } from "react-redux";

export const Header = () => {
  const token = useSelector((state: any) => state?.auth?.user?.token)
  console.log(token, 'dari navbar')
  return (
    <nav className='flex flex-col w-full h-fit bg-black'>
      <section className='w-full justify-between items-center flex h-20 bg-black px-5'>
        <h1 className="text-white">Logo</h1>
        <div className="flex items-center gap-10 text-xs">
          <Link href='/products' className="text-white">P R O D U C T S</Link>
          <Link href={`${!!token ? '/profile' : '/login'}`} className="text-white">{!!token ? 'P R O F I L E' : 'A C C O U N T'}</Link>
        </div>
      </section>
      <section className='w-full items-center justify-end flex gap-10 h-6 text-[10px] bg-black pb-4 px-5'>
        <h1 className="text-white">L O G O</h1>
        <h1 className="text-white">L O G O</h1>
        <h1 className="text-white">L O G O</h1>
        <h1 className="text-white">L O G O</h1>
      </section>
    </nav>
  );
};
