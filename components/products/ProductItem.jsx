import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Chip, Divider, Tooltip } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import Image from 'next/image'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import CompareIcon from '@mui/icons-material/Compare'
import QuickView from '../modals/QuickView'

const theme = createTheme({
  palette: {
    error: {
      main: '#b12024',
      contrastText: '#fff'
    }
  }
})

function ProductItem({ product }) {
  const { t } = useTranslation()
  const [openQuickView, setOpenQuickView] = useState(false)

  const resizeTitle = (string, maxLength) => {
    return string.length > maxLength ? `${string.slice(0, maxLength)}...` : string
  }

  return (
    <>
      <div className='flex flex-col my-4 hover:shadow-button w-full border-2 border-background-300 rounded-lg h-[27rem] md:h-[26rem] xl:h-[29.5rem]'>
        <div className='my-2 w-100 flex flex-row justify-center h-44 md:h-44 xl:h-60'>
          <Link href={`/products/${product.id}`}>
            <Image
              src={`http://127.0.0.1:8000${product.img_principal}`}
              width={180}
              height={10}
              placeholder='blur'
              blurDataURL='/loading.gif'
              className='hover:cursor-pointer'
            />
          </Link>
          <div className='absolute top-8 right-4'>
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
          <Link href={`/products/${product.id}`}>
            {resizeTitle(product.nombre, 20)}
          </Link>
        </div>
        <div className='mx-2 my-0 md:my-0 text-button'>{product.marca.nombre}</div>
        <div className='mx-2 my-0 md:my-0 text-button'>{product.proveedor.nombre}</div>
        <div className='mx-2 my-0 md:mb-0 md:my-0 text-button font-bold'>$ {product.precio.cantidad} {product.precio.moneda}</div>
        <ThemeProvider theme={theme}>
          <div className='felx flex-row mx-1 md:mx-2 my-1 md:my-2 h-7'>
            {product.etiquetas.map((tag) => (
              <Chip key={tag.pk} sx={{ marginRight: 1, marginBottom: 1 }} label={tag.nombre} color="error" />
            ))}
          </div>
        </ThemeProvider>
        <Divider
          sx={{
            marginX: 2,
            marginY: 1,
            backgroundColor: '#6e717a'
          }}
        />
        <div className='flex flex-row justify-between mx-2'>
          <div
            className='ml-2 hover:cursor-pointer p-1 rounded-lg hover:border-button bg-background-100 hover:bg-text-300 border-2 border-background-300 text-button'
          >
            <span><AddShoppingCartIcon /></span> <span className='hidden md:inline'>{t('home.addCart')}</span>
          </div>
          <div className='text-button mr-2 hover:cursor-pointer'>
            <FavoriteBorderIcon fontSize='large' />
          </div>
        </div>
        <QuickView {...{ openQuickView, setOpenQuickView, product }}></QuickView>
      </div>
    </>
  )
}

ProductItem.propTypes = {
  product: PropTypes.object
  // id: PropTypes.number,
  // title: PropTypes.string,
  // price: PropTypes.number,
  // description: PropTypes.string,
  // brand: PropTypes.string,
  // provider: PropTypes.string,
  // image: PropTypes.string
}

export default ProductItem
