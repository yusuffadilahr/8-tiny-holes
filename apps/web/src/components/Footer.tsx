'use client'

import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname()
  return (
    <main className={`w-full h-20 bottom-0 bg-black justify-center items-center ${pathname.startsWith('/dashboard') ? 'hidden' : 'flex'}`}>
      <h1 className="text-white text-[11px] md:text-base">&copy;2024. 8 T I N Y H O L E S. All Right Reserved</h1>
    </main>);
};
