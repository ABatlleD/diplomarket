import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import MainLayout from '../../layouts/MainLayout'
import { Chip, Divider } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AppHeader from '../../components/layouts/AppHeader'
import { useTranslation } from 'react-i18next'
import resources from '../../config/restapi/resources'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Carousel } from 'react-responsive-carousel'

const theme = createTheme({
  palette: {
    error: {
      main: '#b12024',
      contrastText: '#fff'
    }
  }
})

function Product({ product, apiError }) {
  const router = useRouter()

  const { t } = useTranslation()

  const [images, setImages] = useState([])

  useEffect(() => {
    if (product) {
      setImages([product.img_principal, ...product.galeria])
    }
  }, [product])

  if (router.isFallback) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      <AppHeader title={t('pages.products')} />
      <div className='flex flex-col md:flex-row md:justify-between mx-4 my-8'>
        <div className='md:w-[45%] flex flex-row justify-center'>
          <Carousel
            showArrows={false}
            showStatus={false}
            preventMovementUntilSwipeScrollTolerance
            swipeScrollTolerance={100}
            className={'border w-full rounded-lg h-44 md:h-[22rem]'}
          >
            {images.map((item) => (
              <div className='active-resource-card' key={item}>
                <img
                  src={`https://www.diplomarket.com${item}`}
                  alt="..."
                  style={{
                    maxHeight: '350px',
                    borderRadius: '6px',
                    objectFit: 'contain'
                  }}
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className='flex flex-col md:w-1/2'>
          <p className='font-bold text-xl text-text-100 mb-2 mt-8 md:mt-0'>{product.nombre}</p>
          <p className='mb-3 text-button text-lg font-bold'>${product.precio} {product.precio_currency}</p>
          <ThemeProvider theme={theme}>
            <div className='font-semibold md:mb-6'>
              <Chip label="Nuevo" color="error" />
            </div>
          </ThemeProvider>
          <p className='mb-2'>
            <span className='font-semibold'>Subcategoría: </span> <span className='font-semibold text-text-100 underline'>{product.subcategoria}</span>
          </p>
          <p className='mb-2'>
            <span className='font-semibold'>Proveedor: </span> <span className='font-semibold text-text-100 underline'>{product.proveedor.nombre}</span>
          </p>
          <p className='mb-4'>
            <span className='font-semibold'>{t('products.category')}: </span> <span className='font-semibold text-text-100 underline'>{product.marca.nombre}</span>
          </p>
          {product.sku &&
            <p className='mb-8'>
              <span className='font-semibold'>SKU: </span> <span className='font-semibold text-text-100 underline'>{product.sku}</span>
            </p>
          }
          <div className='flex flex-row justify-between'>
            <div
              className='hover:cursor-pointer p-2 rounded-lg hover:border-button bg-background-100 hover:bg-text-300 border-2 border-background-300 text-button'
            >
              <span><AddShoppingCartIcon /></span> <span className='hidden md:inline'>{t('home.addCart')}</span>
            </div>
            <div className='text-button mt-1 mr-2'>
              <FavoriteBorderIcon fontSize='large' />
            </div>
          </div>
          <div className='mt-8'>
            <Divider
              sx={{
                backgroundColor: '#6e717a'
              }}
            />
          </div>
          <h1 className='mt-8 mb-2 font-bold'>{t('products.description')}:</h1>
          <p>{product.descripcion}</p>
          <h1 className='mt-8 mb-2 font-bold'>Enviado desde:</h1>
          <p>{product.municipios.map((item) => (
            `${item.nombre}, `
          ))}</p>
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const { products } = await fetchAllProducts()

  const paths = products.map((product) => ({
    params: { id: product.id.toString() }
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const { product, apiError } = await fetchOneProduct(params.id)

  return {
    props: {
      product,
      apiError
    }
  }
}

async function fetchAllProducts() {
  let apiError = ''
  let products = []
  try {
    products = await (await resources.products.all()).data
  } catch (error) {
    apiError = error.message
  }
  return { products, apiError }
}

async function fetchOneProduct(id) {
  let apiError = ''
  let product = {}
  try {
    product = await (await resources.products.one(id)).data
  } catch (error) {
    apiError = error.message
  }
  return { product, apiError }
}

Product.propTypes = {
  product: PropTypes.object,
  apiError: PropTypes.string
}

Product.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default Product
