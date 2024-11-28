'use client'

import { resetTokenLogout } from "@/redux/slice/authSlice";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

export const Header = () => {
  const token = useSelector((state: any) => state?.auth?.user?.token)
  const cartUser = useSelector((state: any) => state?.auth?.user?.cart)
  const pathname = usePathname()

  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: "Apa Anda ingin logout?",
        text: "Anda akan keluar dan harus login kembali jika melanjutkan.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Konfirmasi",
        cancelButtonText: "Batal"
      });

      if (result.isConfirmed) {
        await Swal.fire({
          title: "Logout Berhasil!",
          text: "Anda berhasil logout.",
          icon: "success"
        });

        Cookies.remove('_toksis');
        Cookies.remove('_roled');
        dispatch(resetTokenLogout({ token: '', email: '', role: '', name: '', cart: null }));

        window.location.href = '/';
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <nav className='flex flex-col w-full h-fit bg-black'>
      <section className='w-full justify-between items-center flex h-20 bg-black px-5'>
        <Link href='/' className="text-white">8 T I N Y H O L E S</Link>
        <div className="flex items-center gap-10 text-xs">
          <Link href='/products' className={`text-white hover:border-b hover:border-white ${pathname.startsWith('/products') ? 'border-b border-white' : ''}`}>P R O D U C T S</Link>
          <Link href={`${!!token ? '/profile' : '/login'}`} className={`text-white hover:border-b hover:border-white ${pathname.startsWith('/profile') || pathname.startsWith('/login') ? 'border-b border-white' : ''}`}>{!!token ? 'P R O F I L E' : 'A C C O U N T'}</Link>
          <Link href='/cart' className={`text-white hover:border-b hover:border-white ${pathname.startsWith('/cart') ? 'border-b border-white' : ''}`}>C A R T ({cartUser?.length > 0 ? cartUser?.length : '0'})</Link>
          {!!token ? <button onClick={handleLogout} className="text-white hover:border-b hover:border-white">L O G O U T</button> : ''}
        </div>
      </section>
      <section className='w-full items-center justify-end flex gap-10 h-6 text-[10px] bg-black pb-4 px-5'>
        <Link href='/newest' className={`text-white hover:border-b hover:border-white ${pathname.startsWith('/newest') ? 'border-b border-white' : ''}`}>N E W E S T</Link>
        <Link href='/category' className={`text-white hover:border-b hover:border-white ${pathname.startsWith('/category') ? 'border-b border-white' : ''}`}>C A T E G O R Y</Link>
        <Link href='/lookbook' className={`text-white hover:border-b hover:border-white ${pathname.startsWith('/lookbook') ? 'border-b border-white' : ''}`}>L O O K B O O K</Link>
        <Link href='/contact' className={`text-white hover:border-b hover:border-white ${pathname.startsWith('/contact') ? 'border-b border-white' : ''}`}>C O N T A C T</Link>
        <Link href='/about' className={`text-white hover:border-b hover:border-white ${pathname.startsWith('/about') ? 'border-b border-white' : ''}`}>A B O U T</Link>
      </section>
    </nav>
  );
};
