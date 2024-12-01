'use client'

import { resetTokenLogout } from "@/redux/slice/authSlice";
import { instance } from "@/utils/axios.instance";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaCartArrowDown, FaDashcube, FaHouseDamage, FaIceCream, FaMoneyBillWave, FaSignOutAlt, FaUserCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function Layout({ children }: { children: ReactNode }) {
    const [isClose, setIsClose] = useState<boolean>(false)
    const dataUser = useSelector((state: any) => state?.auth?.user)
    const role = useSelector((state: any) => state?.auth?.user?.role)
    const token = useSelector((state: any) => state?.auth?.user?.token)
    const router = useRouter()
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
            await instance.post('/auth/logout', {
              email: dataUser?.email
            }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
    
            Cookies.remove('_toksis');
            Cookies.remove('_roled');
            dispatch(resetTokenLogout({ token: '', email: '', role: '', name: '', cart: null }));
    
            window.location.href = '/';
          }
        } catch (error) {
          console.log(error)
        }
      }

    useEffect(() => {
        if (role && role != 'ADMIN' && pathname.startsWith('/dashboard')) {
            router.push('/')
        }
    }, [role, pathname])

    useEffect(() => {
        if (!token && pathname.startsWith('/dashboard')) {
            router.push('/')
        }
    }, [role, token])

    const handleCloseSideBar = () => {
        setIsClose(!isClose)
    }

    return (
        <main className="w-full h-screen flex">
            <section className={`w-3/12 h-full bg-black ${isClose ? 'hidden' : 'flex'} flex-col px-2 text-white`}>
                <div className="h-fit py-10 gap-5 flex justify-start px-5 items-center w-full">
                    <div className="w-10 h-10 rounded-full">
                        <Image
                            src={dataUser?.profile}
                            width={600}
                            height={600}
                            alt="user-profile"
                            className="w-10 h-10 rounded-full border-[1px] border-white"
                        />
                    </div>
                    <div className="flex flex-col text-sm">
                        <h1>{dataUser?.name}</h1>
                        <h1>{dataUser?.role}</h1>
                    </div>
                </div>
                <h1 className="px-4 text-sm text-neutral-600 py-2">Menu</h1>
                <div className="w-full h-full flex flex-col gap-4">
                    <Link href='/dashboard' className={`w-full flex ${pathname == '/dashboard' ? 'bg-white text-black' : 'hover:bg-white'} items-center gap-2 hover:text-black py-2 rounded-full px-4`}>
                        <FaDashcube /> Dashboard</Link>
                    <Link href='/dashboard/products' className={`w-full flex ${pathname == '/dashboard/products' ? 'bg-white text-black' : 'hover:bg-white'} items-center gap-2 hover:text-black py-2 rounded-full px-4`}>
                        <FaCartArrowDown /> Products</Link>
                    <Link href='/dashboard/transaction' className={`w-full flex ${pathname == '/dashboard/transaction' ? 'bg-white text-black' : 'hover:bg-white'} items-center gap-2 hover:text-black py-2 rounded-full px-4`}>
                        <FaMoneyBillWave /> Transaction</Link>
                    <Link href='/' className={`w-full flex ${pathname == '/dashboard/category' ? 'bg-white text-black' : 'hover:bg-white'} items-center gap-2 hover:text-black py-2 rounded-full px-4`}>
                        <FaHouseDamage /> Home Page</Link>
                </div>
                <h1 className="px-4 text-sm text-neutral-600 py-2">Account</h1>
                <div className="w-full h-full flex flex-col gap-4">
                    <Link href='/dashboard/profile' className={`w-full flex ${pathname == '/dashboard/profile' ? 'bg-white text-black' : 'hover:bg-white'} items-center gap-2 hover:text-black py-2 rounded-full px-4`}>
                        <FaUserCheck /> Profile</Link>
                    <span onClick={handleLogout} className={`w-full  cursor-pointer flex hover:bg-white items-center gap-2 hover:text-black py-2 rounded-full px-4`}>
                        <FaSignOutAlt /> Logout</span>
                </div>
            </section>
            <section className="w-full bg-black px-5 py-5 relative">
                <span onClick={handleCloseSideBar} className="absolute cursor-pointer top-16 left-14 z-20 text-white">
                    {isClose ? <FaArrowRight /> : <FaArrowLeft />}
                </span>
                {children}
            </section>
        </main>
    );
}