'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { useSelector } from 'react-redux'

export default function Home() {
  const data = useSelector((state: any) => state?.auth.user)
  console.log(data, "<<< dari global state")
  const imageArr = [
    'https://res.cloudinary.com/dlprsc2zn/image/upload/v1732540931/IMG_0695_aifkup.jpg',
    'https://res.cloudinary.com/dlprsc2zn/image/upload/v1732540925/IMG_0540_kgy5jr.jpg',
    'https://res.cloudinary.com/dlprsc2zn/image/upload/v1732540924/IMG_0679_zu2aof.jpg',
    'https://res.cloudinary.com/dlprsc2zn/image/upload/v1732540921/IMG_0698_lisasz.jpg'
  ]

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
        <div className='w-full h-fit md:h-[80vh] gap-2 space-y-5 md:space-y-0 p-4 md:flex'>
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
          <div className='w-full h-full flex flex-col items-center gap-5 px-10 py-5 rounded-xl bg-neutral-900'>
            <h1 className='text-white text-xl'>L O G O - I M P A C T</h1>
            {/* <video autoPlay loop playsInline muted>
              <source src='/videos/logo-impact.mp4' type='video/mp4' />
            </video> */}
          </div>
        </div>
      </section>
    </main>
  )
}
