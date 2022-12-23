import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function RelatedCard({ item }) {
  return (
    <>
      <div className='flex flex-col w-full border rounded-lg'>
        <div className='flex flex-row justify-center items-center border-b border-b-[#e4e7ea]'>
          <div className='w-[90%] relative flex flex-row justify-center self-center h-24 md:h-44 2xl:h-52'>
            <Link href={`/products/${item.pk}`}>
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND}${item.img_principal}`}
                layout='fill'
                alt='Diplomarket product'
                placeholder='blur'
                blurDataURL='/loading.gif'
                className='hover:cursor-pointer rounded-t-lg'
              />
            </Link>
          </div>
        </div>
        <div className='flex flex-row justify-center items-center py-2'>
          <p className='text-button text-lg font-bold'>US${parseFloat(item.promocion?.descuento ? (parseFloat(item.precio.cantidad) - (parseFloat(item.precio.cantidad) * item.promocion.descuento / 100)) : item.precio.cantidad).toFixed(2)}</p>
        </div>
      </div>
    </>
  )
}

export default RelatedCard
