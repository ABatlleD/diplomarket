import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import useWindowSize from '../../hooks/WindowSize'
import Image from 'next/image'

function SearchResult({ data, setInputValue = () => '' }) {
  const size = useWindowSize()
  const { i18n } = useTranslation()

  const resizeTitle = (string, maxLength) => {
    return string.length > maxLength ? `${string.slice(0, maxLength)}...` : string
  }

  return (
    <>
      {data.tipo === 'Producto' && (
        <div className='flex flex-col mx-2 md:mx-4 my-2'>
          <Link href={`/products/${data.pk}`}>
            <div className='w-full flex flex-row justify-between items-center hover:cursor-pointer hover:bg-background-300' onClick={() => setInputValue('')}>
              <div className='w-1/12 relative flex flex-row justify-center items-center self-center md:mb-1 h-12 md:h-10 2xl:h-16'>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND}${data.img_principal}`}
                  layout='fill'
                  alt='Diplomarket product'
                  placeholder='blur'
                  blurDataURL='/loading.gif'
                  className='hover:cursor-pointer rounded-t-lg'
                />
              </div>
              <div className='w-[3%]'></div>
              <div className='w-[59%] text-xs text-text-blue md:text-base'>{resizeTitle(i18n.language === 'es' ? data.nombre : data.nombre_ingles, size.width < 768 ? 100 : 100)}</div>
              <div className='w-[3%]'></div>
              <div className='flex flex-row w-3/12 justify-end'>
                {data.promocion && data.promocion.descuento && (
                  <div className='px-1 text-button font-bold rounded-xl text-xs md:mr-1 md:text-base'>-{parseFloat(data.promocion.descuento).toFixed(0)}%</div>
                )}
                <div className='px-1 text-button rounded-xl font-bold text-xs md:text-base'>US${parseFloat(data.precio).toFixed(2)}</div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  )
}

export default SearchResult
