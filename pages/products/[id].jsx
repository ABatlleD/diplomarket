import { useRouter } from 'next/router'
import React from 'react'
import PropTypes from 'prop-types'
import MainLayout from '../../layouts/MainLayout'
import { Chip, Divider } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AppHeader from '../../components/layouts/AppHeader'
import { useTranslation } from 'react-i18next'
import resources from '../../config/restapi/resources'

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

  if (router.isFallback) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      <AppHeader title={t('pages.products')} />
      <div className='flex flex-col md:flex-row md:justify-between mx-4 my-8'>
        <div className='md:w-[45%] flex flex-row justify-center border rounded-lg h-44 md:h-[26rem]'>
          <img src={`https://www.diplomarket.com${product.img_principal}`} className="max-w-max h-full" alt="..." />
        </div>
        <div className='flex flex-col md:w-1/2'>
          <p className='font-bold text-xl text-text-100 mb-8 mt-8 md:mt-0'>{product.nombre}</p>
          <p className='mb-8 text-button text-lg font-bold'>${product.precio} {product.precio_currency}</p>
          <p className='mb-8'>
            <span className='font-semibold'>{t('products.category')}: </span> <span className='font-semibold text-text-100 underline'>{product.marca.nombre}</span>
          </p>
          <ThemeProvider theme={theme}>
            <div className='font-semibold md:my-2'>
              <Chip label="Nuevo" color="error" />
            </div>
          </ThemeProvider>
          <div className='mt-8'>
            <Divider
              sx={{
                backgroundColor: '#6e717a'
              }}
            />
          </div>
          <h1 className='mt-8 mb-2 font-bold'>{t('products.description')}:</h1>
          <p>{product.descripcion}</p>
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
