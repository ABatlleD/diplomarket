import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import useWindowSize from '../../hooks/WindowSize'
// import Image from 'next/image'

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
            <div className='w-full flex flex-row justify-between hover:cursor-pointer hover:bg-background-300' onClick={() => setInputValue('')}>
              {/* <div className='w-full relative flex flex-row justify-center self-center md:mb-1 h-24 md:h-44 2xl:h-60'>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND}${data.img_principal}`}
                  layout='fill'
                  alt='Diplomarket product'
                  placeholder='blur'
                  blurDataURL='/loading.gif'
                  className='hover:cursor-pointer rounded-t-lg'
                />
              </div> */}
              <div className='text-xs md:text-base'>{resizeTitle(i18n.language === 'es' ? data.nombre : data.nombre_ingles, size.width < 768 ? 30 : 100)}</div>
              <div className='flex flex-row'>
                {data.promocion && data.promocion.descuento && (
                  <div className='bg-button px-1 text-background-100 rounded-xl h-4 md:h-auto text-xs md:mr-1 md:text-base'>-{data.promocion.descuento}%</div>
                )}
                <div className='bg-button px-1 text-background-100 rounded-xl h-4 md:h-auto text-xs md:text-base'>US${data.precio}</div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  )
}

export default SearchResult
