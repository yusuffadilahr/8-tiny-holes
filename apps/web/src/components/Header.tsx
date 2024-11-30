'use client'

import { useProductsHooks } from "@/features/products/hooks";
import { resetTokenLogout } from "@/redux/slice/authSlice";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

export const Header = () => {
  const token = useSelector((state: any) => state?.auth?.user?.token)
  const cartUser = useSelector((state: any) => state?.auth?.user?.cart)
  const [getCategory, setGetCategory] = useState(false)
  const [isMenuUser, setIsMenuUser] = useState(false)
  const { setCategorySearch } = useProductsHooks()
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

        Cookies.remove('_toksis');
        Cookies.remove('_roled');
        dispatch(resetTokenLogout({ token: '', email: '', role: '', name: '', cart: null }));

        window.location.href = '/';
      }
      setIsMenuUser(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCategorySearch = (category: string) => {
    if (pathname != '/products') {
      router.push(`/products?category=${category}`);
      setGetCategory(false)
    } else {
      setCategorySearch(category)
      setGetCategory(false)
    }
  }

  const handleClickCategory = () => {
    setGetCategory(true)
  }

  const handleMenuCategoryLeave = () => {
    setGetCategory(false)
  }

  const handleMenuUser = () => {
    setIsMenuUser(!isMenuUser)
  }

  return (
    <nav className='flex flex-col w-full h-fit bg-black'>
      <section className='w-full relative justify-between items-center flex h-20 bg-black'>
        {/* <Link href='/' className="text-white">8 T I N Y H O L E S</Link> */}
        <Link href='/' className="w-fit h-7 lg:h-9 px-5">
          <Image
            src={'/images/logos.jpeg'}
            alt="logo"
            width={700}
            height={700}
            className="w-fit h-7 lg:h-9 object-cover"
          />
        </Link>
        <div className="flex items-center gap-2 text-xs px-5">
          <div className="flex items-center gap-10 text-xs px-3">
            <Link href='/newest' className={`text-white hover:border-b hover:border-white ${pathname.startsWith('/newest') ? 'border-b border-white' : ''}`}>N E W E S T</Link>
            <Link href='/products' className={`text-white hover:border-b hover:border-white ${pathname.startsWith('/products') ? 'border-b border-white' : ''}`}>P R O D U C T S</Link>
            <span onMouseEnter={handleClickCategory} className={`cursor-pointer text-white hover:border-b hover:border-white`}>C A T E G O R Y</span>
            <Link href='/lookbook' className={`text-white hover:border-b hover:border-white ${pathname.startsWith('/lookbook') ? 'border-b border-white' : ''}`}>L O O K B O O K</Link>
            <Link href='/contact' className={`text-white hover:border-b hover:border-white ${pathname.startsWith('/contact') ? 'border-b border-white' : ''}`}>C O N T A C T</Link>
            <Link href='/about' className={`text-white hover:border-b hover:border-white ${pathname.startsWith('/about') ? 'border-b border-white' : ''}`}>A B O U T</Link>
            <Link href='/cart' className={`text-white hover:border-b hover:border-white ${pathname.startsWith('/cart') ? 'border-b border-white' : ''}`}>C A R T ({cartUser?.length > 0 ? cartUser?.length : '0'})</Link>
          </div>
          <span onMouseEnter={handleMenuUser} className="text-white cursor-pointer">
            <FaUser />
          </span>
          {/* {!!token ? <button onClick={handleLogout} className="text-white hover:border-b hover:border-white">
            <FaUser />
          </button> : ''} */}
        </div>
        {isMenuUser ?
          <div onMouseLeave={handleMenuUser} className="absolute bottom-[-200px] text-white text-xs w-2/12 right-0 justify-center flex h-52 z-20">
            <div className="w-full h-fit py-5 bg-black px-2 space-y-5">
              <h1>Menu 1</h1>
              <h1>Menu 2</h1>
              <h1>Menu 3</h1>
              <h1>Menu 4</h1>
              {!!token ? <button onClick={handleLogout} className="text-white border w-full py-2">
                L O G O U T
              </button> :
                // <div className="w-full bg-red-500 text-white border py-2">
                <Link href='/login' className="w-full flex py-2 border justify-center">
                  L O G I N
                </Link>
                // </div>
              }
            </div>
          </div>
          :
          ''
        }
        {getCategory ?
          <div className="absolute bottom-[-200px] text-xs w-full justify-center flex h-52 z-20">
            <div onMouseLeave={handleMenuCategoryLeave} className="w-full h-fit py-5 px-20 bg-black">
              <div className="w-full grid grid-cols-5 gap-20 text-center text-white">
                <span onClick={() => handleCategorySearch('t-shirt')}>
                  <span className="cursor-pointer hover:border-b hover:border-white">
                    T - S H I R T
                  </span>
                </span>
                <span onClick={() => handleCategorySearch('jacket')}>
                  <span className="cursor-pointer hover:border-b hover:border-white">
                    J A C K E T
                  </span>
                </span>
                <span onClick={() => handleCategorySearch('caps')}>
                  <span className="cursor-pointer hover:border-b hover:border-white">
                    C A P S
                  </span>
                </span>
                <span onClick={() => handleCategorySearch('pants')}>
                  <span className="cursor-pointer hover:border-b hover:border-white">
                    P A N T S
                  </span>
                </span>
                <span onClick={() => handleCategorySearch('accessories')}>
                  <span className="cursor-pointer hover:border-b hover:border-white">
                    A C C E S S O R I E S
                  </span>
                </span>

                {/* <span onClick={() => handleCategorySearch('jacket')}>
                  <span className="hover:border-b hover:border-white">J A C K E T</span></span>
                <span onClick={() => handleCategorySearch('caps')}>
                  <span className="hover:border-b hover:border-white">C A P S</span></span>
                <span onClick={() => handleCategorySearch('pants')}>
                  <span className="hover:border-b hover:border-white">P A N T S</span></span>
                <span onClick={() => handleCategorySearch('accessories')}>
                  <span className="hover:border-b hover:border-white">A C C E S S O R I E S</span></span> */}
              </div>
            </div>
          </div>
          : ''}
      </section>

      {/* <section className='w-full items-center justify-end flex gap-10 h-6 text-[10px] bg-black pb-4 px-5'>
        <Link href='/newest' className={`text-white hover:border-b hover:border-white ${pathname.startsWith('/newest') ? 'border-b border-white' : ''}`}>N E W E S T</Link>
        <Link href='/category' className={`text-white hover:border-b hover:border-white ${pathname.startsWith('/category') ? 'border-b border-white' : ''}`}>C A T E G O R Y</Link>
        <Link href='/lookbook' className={`text-white hover:border-b hover:border-white ${pathname.startsWith('/lookbook') ? 'border-b border-white' : ''}`}>L O O K B O O K</Link>
        <Link href='/contact' className={`text-white hover:border-b hover:border-white ${pathname.startsWith('/contact') ? 'border-b border-white' : ''}`}>C O N T A C T</Link>
        <Link href='/about' className={`text-white hover:border-b hover:border-white ${pathname.startsWith('/about') ? 'border-b border-white' : ''}`}>A B O U T</Link>
        <Link href={`${!!token ? '/profile' : '/login'}`} className={`text-white hover:border-b hover:border-white ${pathname.startsWith('/profile') || pathname.startsWith('/login') ? 'border-b border-white' : ''}`}>{!!token ? 'P R O F I L E' : 'A C C O U N T'}</Link>
      </section> */}

    </nav>
  );
};
