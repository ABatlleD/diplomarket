import React, { useState } from 'react'
import { Divider, Tooltip } from '@mui/material'
import useWindowSize from '../../hooks/WindowSize'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import Image from 'next/image'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import QuickView from '../modals/QuickView'
import AddToFav from '../fav/AddFav'
import AddToCart from '../cart/AddCart'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import { useRouter } from 'next/router'
import { addClicks } from '../../libs/quick-tip'
import { useCompare } from '../../store/compare/compare.context'

function ProductItem({ product }) {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const [openQuickView, setOpenQuickView] = useState(false)
  const size = useWindowSize()

  const resizeTitle = (string, maxLength) => {
    return string.length > maxLength ? `${string.slice(0, maxLength)}...` : string
  }

  const {
    items,
    addItemToCompare,
    removeItemFromCompare,
    isInCompare
  } = useCompare()

  const goToCompare = (id) => {
    if (items.length >= 5 && !isInCompare(id)) {
      removeItemFromCompare(items[0].id)
      addItemToCompare(id, 1)
    } else if (!isInCompare(id)) {
      addItemToCompare(id, 1)
    }

    addClicks()
    router.push('/compare')
  }

  return (
    <>
      <div className='flex flex-col hover:shadow-button w-full border rounded-lg h-[14.5rem] md:h-[20rem] 2xl:h-[25.4rem]'>
        <div className='w-full relative flex flex-row justify-center self-center md:mb-1 h-24 md:h-44 2xl:h-60'>
          <Link href={`/products/${product.id}`}>
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND}${product.img_principal}`}
              layout='fill'
              alt='Diplomarket product'
              placeholder='blur'
              blurDataURL='/loading.gif'
              className='hover:cursor-pointer rounded-t-lg'
            />
          </Link>
          <div className='absolute right-0 top-[4.5rem] md:top-0'>
            <Tooltip title={t('quick')} placement='right'>
              <div
                className='rounded-l-lg rounded-tr-lg pr-1 pl-[0.1rem] mb-2 hover:cursor-pointer text-background-100 bg-footer-background-200'
                onClick={() => {
                  addClicks()
                  setOpenQuickView(true)
                }}
              >
                <ZoomInIcon fontSize={size.width < 768 ? 'small' : 'medium'} />
              </div>
            </Tooltip>
          </div>
          <div className='absolute hidden md:flex right-0 top-9 md:top-8'>
            <Tooltip title={t('compare')} placement='right'>
              <div
                className='rounded-l-lg pr-1 pl-[0.1rem] mb-2 hover:cursor-pointer text-background-100 bg-button'
                onClick={() => goToCompare(product.id)}
              >
                <CompareArrowsIcon fontSize={size.width < 768 ? 'samll' : 'medium'} />
              </div>
            </Tooltip>
          </div>
          <div className='absolute top-2 left-0'>
            <div className='felx flex-col my-1 md:my-2'>
              {product.etiquetas.map((tag) => (
                <div key={tag.pk}>
                  <div
                    className='px-1 mb-1 rounded-r-full font-weight-light text-[0.6rem] md:text-sm'
                    style={{
                      backgroundColor: `${tag.fondo}`,
                      color: `${tag.texto}`
                    }}
                  >
                    {i18n.language === 'es' ? tag.nombre : tag.ingles}
                  </div>
                </div>
              ))}
              {product.promocion.activo && (
                <div className='hidden md:flex'>
                  <div
                    className='bg-button hidden md:flex px-1 rounded-r-full text-background-100 font-weight-light text-[0.5rem] md:text-xs'
                  >
                    -{parseFloat(product.promocion.descuento).toFixed(0)}%
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='flex flex-col h-[5.7rem] md:h-[7rem]'>
          <div className='mx-2 text-text-blue text-sm h-9 md:h-10'>
            <Link href={`/products/${product.id}`}>
              {resizeTitle(i18n.language === 'es' ? product.nombre : product.nombre_ingles, size.width > 768 ? size.width > 1900 ? 80 : 65 : 18)}
            </Link>
          </div>
          {size.width >= 768 && (
            <div className='mx-2 my-0 md:my-0 text-button text-sm md:text-base'>{product.proveedor.nombre}</div>
          )}
          {!product.promocion.activo && (
            <div className='mx-2 my-0 md:mb-0 md:my-0 text-button font-bold text-base'>US${parseFloat(product.precio.cantidad).toFixed(2)}</div>
          )}
          {product.promocion.activo && (
            <div className='flex flex-col md:flex-row ml-2 leading-3'>
              <p className='my-0 md:mb-0 md:my-0 text-button font-bold text-base'>US${parseFloat(product.precio.cantidad - (product.precio.cantidad * product.promocion.descuento / 100)).toFixed(2)} </p>
              <div className='flex flex-row'>
                <div
                  className='bg-button flex md:hidden rounded-md px-1 mr-1 text-background-100 text-xs'
                >
                  -{parseFloat(product.promocion.descuento).toFixed(0)}%
                </div>
                <p className='my-0 md:ml-1 md:pt-[0.15rem] text-text-100 text-xs md:text-sm line-through'> US${parseFloat(product.precio.cantidad).toFixed(2)}</p>
              </div>
            </div>
          )}
          {product.precioxlibra.cantidad !== '0.00' && (
            <div className='mx-2 my-0 md:mb-0 md:my-0 text-text-100 text-xs md:text-base'>US${parseFloat(product.precioxlibra.cantidad).toFixed(2)}/{product.um}</div>
          )}
          {product.precioxlibra.cantidad === '0.00' && (
            <div className='md:h-6'></div>
          )}
        </div>
          <Divider
            sx={{
              marginX: 1,
              marginY: 1,
              backgroundColor: '#6e717a'
            }}
          />
          <div className='flex flex-row justify-between mx-1 mt-[-3px] md:mt-0'>
            <div
              className='ml-2 hover:cursor-pointer'
            >
              {Number(product.cant_inventario) > 0
                ? (
                    <AddToCart data={product} text={size.width < 768 ? undefined : t('home.addCart')} sizes={{ width: 11, height: 11 }} />
                  )
                : <></>}
            </div>
            <div className='mt-[-2px]'>
              <AddToFav data={product}/>
            </div>
          </div>
        <QuickView {...{ openQuickView, setOpenQuickView, product }}></QuickView>
      </div>
    </>
  )
}

export default ProductItem
