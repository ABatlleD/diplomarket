import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Divider, Tooltip } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import useWindowSize from '../../hooks/WindowSize'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import Image from 'next/image'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import QuickView from '../modals/QuickView'
import AddToFav from '../fav/AddFav'
import AddToCart from '../cart/AddCart'

const theme = createTheme({
  palette: {
    error: {
      main: '#b12024',
      contrastText: '#fff'
    }
  }
})

function ProductItem({ product }) {
  const { i18n } = useTranslation()
  const [openQuickView, setOpenQuickView] = useState(false)
  const size = useWindowSize()

  const resizeTitle = (string, maxLength) => {
    return string.length > maxLength ? `${string.slice(0, maxLength)}...` : string
  }

  return (
    <>
      <div className='flex flex-col hover:shadow-button w-full bg-background-300 rounded-lg h-[12.5rem] md:h-[23rem] xl:h-[27rem]'>
        <div className='w-[90%] relative flex flex-row justify-center self-center mt-2 bg-background-300 h-24 md:h-44 xl:h-60'>
          <Link href={`/products/${product.id}`}>
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND}${product.img_principal}`}
              width={size.width < 768 ? 90 : 180}
              height={10}
              placeholder='blur'
              blurDataURL='/loading.gif'
              className='hover:cursor-pointer'
            />
          </Link>
          <div className='absolute right-1 top-1'>
            <Tooltip title='Quick View' placement='right'>
              <div
                className='rounded-lg mb-2 hover:cursor-pointer hover:text-background-100 hover:bg-button bg-background-100'
                onClick={() => setOpenQuickView(true)}
              >
                <ZoomInIcon />
              </div>
            </Tooltip>
          </div>
          <div className='absolute top-1 left-1'>
            <ThemeProvider theme={theme}>
              <div className='felx flex-col md:my-2'>
                {product.etiquetas.map((tag) => (
                  <div
                    key={tag.pk}
                    className='bg-button p-1 rounded-full text-background-100 text-xs'
                  >
                    {i18n.language === 'es' ? tag.nombre : tag.ingles}
                  </div>
                ))}
              </div>
            </ThemeProvider>
          </div>
        </div>
        <div className='mx-2 md:my-2 text-text-100 text-sm md:text-base md:h-6'>
          <Link href={`/products/${product.id}`}>
            {resizeTitle(i18n.language === 'es' ? product.nombre : product.nombre_ingles, size.width < 768 ? 12 : 20)}
          </Link>
        </div>
        <div className='mx-2 my-0 md:my-0 text-button text-sm md:text-base'>{product.marca.nombre}</div>
        <div className='mx-2 my-0 md:my-0 text-button text-sm md:text-base'>{product.proveedor.nombre}</div>
        <div className='mx-2 my-0 md:mb-0 md:my-0 text-button font-bold text-sm md:text-base'>${product.precio.cantidad} {product.precio.moneda}</div>
        {product.precioxlibra.cantidad !== '0.00' && (
          <div className='mx-2 my-0 md:mb-0 md:my-0 font-bold text-sm md:text-base'>${product.precioxlibra.cantidad} {product.precioxlibra.moneda}/{product.um}</div>
        )}
        {product.precioxlibra.cantidad === '0.00' && (
          <div className='md:h-6'></div>
        )}
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
                    <AddToCart data={product} />
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

ProductItem.propTypes = {
  product: PropTypes.object
}

export default ProductItem
