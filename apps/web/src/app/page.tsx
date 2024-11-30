'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import CardProduct from '@/components/core/cardProduct'
import { useQuery } from '@tanstack/react-query'
import { instance } from '@/utils/axios.instance'

export default function Home() {
  const data = useSelector((state: any) => state?.auth.user)

  const imageArr = [
    'https://res.cloudinary.com/dlprsc2zn/image/upload/v1732540931/IMG_0695_aifkup.jpg',
    'https://res.cloudinary.com/dlprsc2zn/image/upload/v1732540925/IMG_0540_kgy5jr.jpg',
    'https://res.cloudinary.com/dlprsc2zn/image/upload/v1732540924/IMG_0679_zu2aof.jpg',
    'https://res.cloudinary.com/dlprsc2zn/image/upload/v1732540921/IMG_0698_lisasz.jpg'
  ]

  const { data: newestProducts } = useQuery({
    queryKey: ['get-data-product'],
    queryFn: async () => {
      const res = await instance.get('/product/newest')
      return res?.data?.data
    }
  })

  return (
    <main className='w-full h-fit'>
      <section className='w-full h-fit relative'>
        <div className='w-full h-72 relative flex'>
          <Image
            className='w-full h-72 object-cover'
            src={'https://res.cloudinary.com/dlprsc2zn/image/upload/v1732539377/bg_qxqtar.jpg'}
            width={1000}
            height={1000}
            alt='carousell'
          />
          <div className='absolute h-20 text-center w-full flex items-center justify-center top-[120px]'>
            <Image
              className='lg:w-[600px] h-fit object-cover'
              src={'https://res.cloudinary.com/dlprsc2zn/image/upload/v1732538397/white_yesouc.png'}
              width={500}
              height={500}
              alt='carousell'
            />
          </div>
        </div>
      </section>
      <section className='bg-black w-full h-fit py-3'>
        <div className='w-full h-fit md:h-[80vh] flex flex-col md:flex-row gap-2 p-4 md:flex'>
          <div className='w-full md:w-8/12 h-full flex items-center'>
            <div className='w-full flex justify-center h-fit'>
              <div className='grid grid-cols-2 w-full gap-1'>
                {imageArr?.map((item, i) => (
                  <div key={i} className='h-44 lg:h-56 w-full'>
                    <Image
                      className='w-full h-44 lg:h-56 object-cover'
                      src={item}
                      width={500}
                      height={500}
                      alt='carousell'
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Link href='/products' className='w-full h-full hover:opacity-75'>
            <div className='w-full h-full relative flex flex-col items-center gap-5 rounded-xl md:py-2 py-0'>
              <Image
                className='w-full h-full object-cover rounded-xl'
                src='/images/impa.jpeg'
                width={800}
                height={800}
                alt='imp'
              />
              <div className='absolute top-20'>
                <h1 className='text-white text-7xl'>LOGO IMPACT</h1>
              </div>
            </div>
          </Link>
        </div>
      </section>
      <section className='w-full flex flex-col justify-center items-center h-fit px-4 bg-black'>
        <div className='w-full flex flex-col justify-center items-center py-5 rounded-xl bg-white'>
          <h1 className='z-10 font-bold'>N E W - R E L E A S E</h1>
          <div className='grid grid-cols-2 lg:grid-cols-4 w-full overflow-hidden'>
            {newestProducts?.map((item: any, i: any) => (
              <Link href={`/products/${item?.id}-16320-${item?.productName.toLowerCase()}`} key={i}>
                <CardProduct
                  itemName={item?.productName}
                  imageUrl={item?.productImage[0]?.imageUrl}
                  itemCategory={item?.category}
                  itemPrice={item?.price}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className='w-full bg-black h-fit flex justify-center px-4 py-10'>
        <video autoPlay loop playsInline muted className='w-full rounded-xl'>
          <source src='/videos/rens.mp4' type='video/mp4' />
        </video>
      </section>
    </main>
  )
}
