import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import storeImg from '../../public/assets/store.png'

function ProviderItem({ provider }) {
  const [imgSrc, setImgSrc] = useState(
    `${process.env.NEXT_PUBLIC_BACKEND}${provider.img}`
  )

  return (
    <>
      <div className="flex flex-col hover:shadow-button shadow-sm w-full border rounded-lg h-[15.5rem] md:h-[20rem] 2xl:h-[16rem]">
        <div className="w-full relative flex flex-col justify-center self-center md:mb-1 h-36 md:h-44">
          <Link href={{ pathname: '/', query: { id: provider.pk } }}>
            <Image
              src={imgSrc}
              layout="fill"
              alt={provider.nombre}
              onError={() => setImgSrc(storeImg)}
              placeholder="blur"
              blurDataURL="/loading.gif"
              className="hover:cursor-pointer rounded-t-lg"
            />
          </Link>
        </div>
        <Link href={{ pathname: '/', query: { id: provider.pk } }}>
          <div className="flex md:justify-center mt-2 mx-2 text-lg font-bold h-[4rem] md:h-auto">
            {provider.nombre}
          </div>
        </Link>
        {/* <Link href={`providers/${provider.id}`}>
          <div className="flex md:justify-center mx-2 font-bold text-text-100 underline">
            DETALLES
          </div>
        </Link> */}
      </div>
    </>
  )
}

export default ProviderItem
