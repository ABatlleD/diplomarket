import React from 'react'
import PropTypes from 'prop-types'
import { Chip, Divider } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

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

  const resizeTitle = (string, maxLength) => {
    return string.length > maxLength ? `${string.slice(0, maxLength)}...` : string
  }

  return (
    <>
      <div className='flex flex-col my-4 hover:shadow-button w-full border-2 border-background-300 rounded-lg h-[30rem] md:h-[32rem] xl:h-[36rem]'>
        <div className='my-2 w-100 flex flex-row justify-center h-44 md:h-48 xl:h-64'>
          <Link href={`/products/${product.id}`}>
            <img src={`https://www.diplomarket.com${product.img_principal}`} className="max-w-full hover:cursor-pointer h-full" alt="..." />
          </Link>
        </div>
        <div className='mx-2 mt-2 mb-2 md:my-2 text-text-100 h-16 md:h-14'>
          <Link href={`/products/${product.id}`}>
            {resizeTitle(product.nombre, 30)}
          </Link>
        </div>
        <div className='mx-2 my-1 md:my-2 text-button'>{product.marca.nombre}</div>
        <div className='mx-2 my-1 md:my-2 text-button'>{product.proveedor.nombre}</div>
        <div className='mx-2 my-1 md:mb-0 md:my-2 text-button font-bold'>$ {product.precio.cantidad} {product.precio.moneda}</div>
        <ThemeProvider theme={theme}>
          <div className='felx flex-row mx-2 my-1 md:my-2 h-7'>
            {product.etiquetas.map((tag) => (
              <Chip key={tag.pk} sx={{ marginRight: 1, marginBottom: 1 }} label={tag.nombre} color="error" />
            ))}
          </div>
        </ThemeProvider>
        <Divider
          sx={{
            marginX: 2,
            marginY: 2,
            backgroundColor: '#6e717a'
          }}
        />
        <div className='flex flex-row justify-between mx-2'>
          <div
            className='ml-2 hover:cursor-pointer p-2 rounded-lg hover:border-button bg-background-100 hover:bg-text-300 border-2 border-background-300 text-button'
          >
            <span><AddShoppingCartIcon /></span> <span className='hidden md:inline'>{t('home.addCart')}</span>
          </div>
          <div className='text-button mt-1 mr-2'>
            <FavoriteBorderIcon fontSize='large' />
          </div>
        </div>
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
