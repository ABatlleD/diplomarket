import React from 'react'
import PropTypes from 'prop-types'
import { Chip, Divider } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useTranslation } from 'react-i18next'

const theme = createTheme({
  palette: {
    error: {
      main: '#b12024',
      contrastText: '#fff'
    }
  }
})

function ProductItem({ title, price, category, image }) {
  const { t } = useTranslation()

  return (
    <>
      <div className='flex flex-col hover:cursor-pointer my-4 hover:shadow-button w-full border-2 border-background-300 rounded-lg h-[22rem] md:h-[26rem] xl:h-[28rem]'>
        <div className='my-2 w-100 flex flex-row justify-center h-16 md:h-28 xl:h-36'>
          <img src={image} className="max-w-max h-full" alt="..." />
        </div>
        <div className='mx-2 mt-2 mb-1 md:my-2 text-text-100 h-14'>{title}</div>
        <div className='mx-2 my-1 md:my-2 text-button'>{category}</div>
        <div className='mx-2 my-1 md:my-2 text-button font-bold'>$ {price} USD</div>
        <ThemeProvider theme={theme}>
          <div className='mx-2 my-1 md:my-2'>
            <Chip label="Nuevo" color="error" />
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
  title: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
  category: PropTypes.string,
  image: PropTypes.string
}

export default ProductItem
