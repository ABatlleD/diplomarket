import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Divider, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import Image from 'next/image'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import CompareIcon from '@mui/icons-material/Compare'
import QuickView from '../modals/QuickView'
import AddToFav from '../fav/AddFav'
import AddToCart from '../cart/AddCart'
import resources from '../../restapi/resources'
import useWindowSize from '../../hooks/WindowSize.js'

// const theme = createTheme({
//   palette: {
//     error: {
//       main: '#b12024',
//       contrastText: '#fff'
//     }
//   }
// })

function FavItem({ id }) {
  const { i18n } = useTranslation()
  const [openQuickView, setOpenQuickView] = useState(false)
  const [product, setProduct] = useState({})
  const size = useWindowSize()

  useEffect(() => {
    resources.products.one(id)
      .then(response => setProduct(response.data))
  }, [])

  const resizeTitle = (string, maxLength) => {
    return string?.length > maxLength ? `${string?.slice(0, maxLength)}...` : string
  }

  return (
    <>
      <div className='flex flex-col hover:shadow-button w-full bg-background-300 rounded-lg h-[12rem] md:h-[22rem] xl:h-[26rem]'>
        <div className='w-full relative flex flex-row justify-center h-24 md:h-44 xl:h-60'>
          {product.img_principal && (
            <Link href={`/products/${product.id}`}>
              <Image
                src={`http://127.0.0.1:8000${product.img_principal}`}
                width={size.width < 768 ? 90 : 180}
                height={10}
                placeholder='blur'
                blurDataURL='/loading.gif'
                className='hover:cursor-pointer'
              />
            </Link>
          )}
          <div className='absolute right-1'>
            <Tooltip title='Quick View' placement='right'>
              <div
                className='rounded-lg mb-2 hover:cursor-pointer hover:text-background-100 hover:bg-button bg-background-100'
                onClick={() => setOpenQuickView(true)}
              >
                <ZoomInIcon />
              </div>
            </Tooltip>
            <Link href={'/products/compare'}>
              <Tooltip title='Compare' placement='right'>
                <div className='rounded-lg hover:cursor-pointer hover:text-background-100 hover:bg-button bg-background-100'>
                  <CompareIcon />
                </div>
              </Tooltip>
            </Link>
          </div>
        </div>
        <div className='mx-2 mt-2 mb-2 md:my-2 text-text-100 h-10 md:h-6'>
          {product.id && (
            <Link href={`/products/${product.id}`}>
              {resizeTitle(i18n.language === 'es' ? product.nombre : product.nombre_ingles, size.width < 768 ? 10 : 20)}
            </Link>
          )}
        </div>
        <div className='mx-2 my-0 md:my-0 text-button'>{product.marca?.nombre}</div>
        <div className='mx-2 my-0 md:my-0 text-button'>{product.proveedor?.nombre}</div>
        <div className='mx-2 my-0 md:mb-0 md:my-0 text-button font-bold'>$ {product.precio} {product.precio_currency}</div>
        {/* {product.etiquetas && (
          <ThemeProvider theme={theme}>
            <div className='felx flex-row mx-1 md:mx-2 my-1 md:my-2 h-7'>
              {product.etiquetas?.map((tag) => (
                <Chip key={tag.pk} sx={{ marginRight: 1, marginBottom: 1 }} label={i18n.language === 'es' ? tag.nombre : tag.ingles} color="error" />
              ))}
            </div>
          </ThemeProvider>
        )} */}
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

FavItem.propTypes = {
  id: PropTypes.number
}

export default FavItem
