import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Divider, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import Image from 'next/image'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
// import CompareIcon from '@mui/icons-material/Compare'
import QuickView from '../modals/QuickView'
import AddToFav from '../fav/AddFav'
import AddToCart from '../cart/AddCart'
import resources from '../../restapi/resources'
import useWindowSize from '../../hooks/WindowSize.js'

function FavItem({ id }) {
  const { i18n } = useTranslation()
  const [openQuickView, setOpenQuickView] = useState(false)
  const [product, setProduct] = useState({})
  const size = useWindowSize()

  useEffect(() => {
    resources.products.one(id)
      .then(response => setProduct(response.data))
    console.log('🚀 ~ file: FavItem.jsx ~ line 19 ~ FavItem ~ product', product)
  }, [])

  const resizeTitle = (string, maxLength) => {
    return string?.length > maxLength ? `${string?.slice(0, maxLength)}...` : string
  }

  return (
    <>
      <div className='flex flex-col hover:shadow-button w-full border rounded-lg h-[13.5rem] md:h-[20rem] 2xl:h-[24rem]'>
        <div className='w-full relative flex flex-row justify-center self-center h-24 md:h-44 2xl:h-60'>
          {product.img_principal && (
            <Link href={`/products/${product.id}`}>
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND}${product.img_principal}`}
                layout='fill'
                placeholder='blur'
                blurDataURL='/loading.gif'
                className='hover:cursor-pointer'
              />
            </Link>
          )}
          <div className='absolute right-0 top-1'>
            <Tooltip title='Quick View' placement='right'>
              <div
                className='rounded-l-lg pr-1 pl-[0.1rem] mb-2 hover:cursor-pointer text-background-100 bg-footer-background-200'
                onClick={() => setOpenQuickView(true)}
              >
                <ZoomInIcon fontSize={size.width < 768 ? 'samll' : 'medium'} />
              </div>
            </Tooltip>
          </div>
        </div>
        <div className='flex flex-col h-20 md:h-24'>
          <div className='mx-2 text-text-blue text-sm md:text-base md:h-6'>
            {product.id && (
              <Link href={`/products/${product.id}`}>
                {resizeTitle(i18n.language === 'es' ? product.nombre : product.nombre_ingles, size.width < 768 ? 10 : 20)}
              </Link>
            )}
          </div>
          <div className='mx-2 my-0 md:my-0 text-button text-sm md:text-base'>{product.proveedor?.nombre}</div>
          {(!product.promocion || !product.promocion.activo) && (
            <div className='mx-2 my-0 md:mb-0 md:my-0 text-button font-bold text-sm md:text-base'>US${product.precio}</div>
          )}
          {product.promocion && product.promocion.activo && (
            <div className='flex flex-col md:flex-row ml-2 leading-3'>
              <p className='my-0 md:mb-0 md:my-0 text-button font-bold text-xs md:text-base'>US${(product.precio - (product.precio * product.promocion.descuento / 100)).toFixed(2)} </p>
              <div className='flex flex-row'>
                <div
                  className='bg-button flex md:hidden rounded-md px-1 mr-1 text-background-100 text-xs'
                >
                  -{product.promocion.nombre}
                </div>
                <p className='my-0 md:ml-1 md:pt-[0.15rem] text-text-100 text-xs md:text-sm line-through'> US${product.precio}</p>
              </div>
            </div>
          )}
          {product.precioxlibra !== 0 && (
            <div className='mx-2 my-0 md:mb-0 md:my-0 text-text-100 text-xs md:text-base'>US${product.precioxlibra}/{product.um}</div>
          )}
          {product.precioxlibra === 0 && (
            <div className='md:h-6'></div>
          )}
        </div>
        {size.width > 768 &&
          <Divider
            sx={{
              marginX: 2,
              marginY: 1,
              backgroundColor: '#6e717a'
            }}
          />
        }
        {size.width > 768 &&
          <div className='flex flex-row justify-between mx-2'>
            <div
              className='ml-2 hover:cursor-pointer'
            >
              {Number(product.cant_inventario) > 0
                ? (
                    <AddToCart data={{
                      ...product,
                      precio: {
                        cantidad: product.precio,
                        moneda: product.precio_currency
                      }
                    }} />
                  )
                : <></>}
            </div>
            <AddToFav data={product}/>
          </div>
        }
        <QuickView {...{ openQuickView, setOpenQuickView, product }}></QuickView>
      </div>
    </>
  )
}

FavItem.propTypes = {
  id: PropTypes.number
}

export default FavItem
