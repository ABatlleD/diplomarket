import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import MainLayout from '../../layouts/MainLayout'
import { Chip, Box, Tabs, Tab } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AppHeader from '../../components/layouts/AppHeader'
import { useTranslation } from 'react-i18next'
import resources from '../../restapi/resources'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Carousel } from 'react-responsive-carousel'
import ProductsCarousel from '../../components/products/ProductsSwiper.jsx'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import AppTabPanel from '../../components/AppTabPanel'
import ImageMagnifier from '../../components/ImageMagnifier'

const theme = createTheme({
  palette: {
    error: {
      main: '#b12024',
      contrastText: '#fff'
    }
  }
})

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

function Product({ product, apiError }) {
  const router = useRouter()
  const [relatedProducts, setRelatedProducts] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [amount, setAmount] = useState(1)
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const { t } = useTranslation()

  const [images, setImages] = useState([])

  const amountUpDown = (direction) => {
    if (direction === 'up') {
      setAmount(amount + 1)
    } else {
      if (amount > 1) {
        setAmount(amount - 1)
      }
    }
  }

  useEffect(() => {
    if (product) {
      setImages([product.img_principal, ...product.galeria])
      setLoading(true)
      resources.products_related.all(product.id, 1)
        .then(response => setRelatedProducts(response.data))
      setLoading(false)
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
            className={'border w-full rounded-lg h-[20rem] md:h-[19rem]'}
          >
            {images && images.map((item) => (
              <ImageMagnifier
                key={item}
                src={`http://127.0.0.1:8000${item}`}
                width={'200px'}
                magnifierHeight={100}
                magnifieWidth={100}
                zoomLevel={1.5}
              />
            ))}
          </Carousel>
        </div>
        <div className='flex flex-col mt-28 md:mt-0 md:w-1/2'>
          <p className='font-bold text-2xl text-text-100 mb-2 mt-8 md:mt-0'>{product.nombre}</p>
          <div className='flex flex-row'>
            <ThemeProvider theme={theme}>
              <div className='felx flex-row'>
                {product.etiquetas.map((tag) => (
                  <Chip key={tag.pk} sx={{ marginRight: 1, marginBottom: 1 }} label={tag.nombre} color="error" />
                ))}
              </div>
            </ThemeProvider>
            {product.sku &&
              <p className='ml-6 mt-1'>
                <span className='font-semibold'>SKU: </span> <span className='font-semibold'>{product.sku}</span>
              </p>
            }
          </div>
          <p className='mb-3 mt-2 text-button text-xl font-bold'>${product.precio} {product.precio_currency}</p>
          <p className='mb-2'>
            <span className='font-semibold'>Subcategoría: </span> <span className='font-semibold text-text-100 underline'>{product.subcategoria}</span>
          </p>
          <p className='mb-2'>
            <span className='font-semibold'>Proveedor: </span> <span className='font-semibold text-text-100 underline'>{product.proveedor.nombre}</span>
          </p>
          <p className='mb-4'>
            <span className='font-semibold'>Marca: </span> <span className='font-semibold text-text-100 underline'>{product.marca.nombre}</span>
          </p>
          <div className='flex flex-col'>
            <div className='flex flex-row w-11/12 mb-4'>
              <div className='w-4/12 md:w-3/12'>
                <div className='flex flex-row'>
                  <div
                    className='bg-text-100 rounded-md p-1 hover:cursor-pointer hover:opacity-90'
                    onClick={() => { amountUpDown('down') }}
                  >
                    <RemoveIcon />
                  </div>
                  <p className='text-lg mt-1 font-semibold w-6 md:w-10 text-center'>{amount}</p>
                  <div
                    className='bg-text-100 rounded-md p-1 hover:cursor-pointer hover:opacity-90'
                    onClick={() => { amountUpDown('up') }}
                  >
                    <AddIcon />
                  </div>
                </div>
              </div>
              <div className='w-8/12 md:w-9/12'>
                <div className='hover:opacity-90 py-1 w-full hover:cursor-pointer bg-footer-background-100 text-background-100 shadow-md text-center rounded-md'>
                  Add Cart
                </div>
              </div>
            </div>
            <div className='bg-whatsapp w-11/12 mb-4 shadow-lg text-background-100 py-1 text-center rounded-md hover:cursor-pointer hover:opacity-90'> Shop Now</div>
            <div className='flex flex-row text-button mt-1 hover:cursor-pointer hover:opacity-90'>
              <FavoriteBorderIcon />
              <p>Add To Wishlist</p>
            </div>
          </div>
        </div>
      </div>
      {isLoading &&
        <>Loading...</>
      }
      <div className='w-full flex flex-col items-center xs:mt-4 md:mt-28 mb-8'>
        <Box sx={{ width: '95%', borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              textColor="inherit"
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label={t('products.description')} {...a11yProps(0)} />
              <Tab label="Envios Desde" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <AppTabPanel value={value} index={0}>
            {product.descripcion}
          </AppTabPanel>
          <AppTabPanel value={value} index={1}>
            {product.municipios.map((item) => (
              `${item.nombre}, `
            ))}
          </AppTabPanel>
        </Box>
        {/* <h1 className='mt-8 mb-2 font-bold'>{t('products.description')}:</h1>
        <p>{product.descripcion}</p>
        <h1 className='mt-8 mb-2 font-bold'>Enviado desde:</h1>
        <p>{product.municipios.map((item) => (
          `${item.nombre}, `
        ))}</p> */}
      </div>
      <div className='mx-3 mb-4'>
        <p className='font-bold text-center text-3xl'>Related Product</p>
        <ProductsCarousel products={relatedProducts} />
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
