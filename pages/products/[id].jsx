import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Chip, Box, Tabs, Tab } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import resources from '../../restapi/resources'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { useCart } from '../../store/cart/cart.context'
import { generateCartItem } from '../../store/cart/generate-cart-item'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useOneProduct } from '../../restapi/query'

const MainLayout = dynamic(() => import('../../layouts/MainLayout'))
const AppHeader = dynamic(() => import('../../components/layouts/AppHeader'))
const ProductsCarousel = dynamic(() =>
  import('../../components/products/ProductsSwiper')
)
const AddToCart = dynamic(() => import('../../components/cart/AddCart'))
const AddToFav = dynamic(() => import('../../components/fav/AddFav'))
const AppTabPanel = dynamic(() => import('../../components/AppTabPanel'))
const RelatedCard = dynamic(() =>
  import('../../components/products/RelatedCard')
)

const theme = createTheme({
  palette: {
    error: {
      main: '#b12024',
      contrastText: '#fff',
    },
  },
})

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function Product() {
  const router = useRouter()
  const { id } = router.query
  const { product, productIsLoading, productError } = useOneProduct(id)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [value, setValue] = React.useState(0)
  const [state, setState] = useState({
    backgroundPosition: '0% 0%',
  })
  const [hover, setHover] = useState(false)
  const { data } = useSession()

  const { addItemToCart, isInCart } = useCart()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const { t, i18n } = useTranslation()

  const [images, setImages] = useState([])

  const handleMouseMove = (e) => {
    setHover(true)
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = ((e.pageX - left) / width) * 100
    const y = ((e.pageY - top) / height) * 100
    setState({ backgroundPosition: `${x}% ${y}%` })
  }

  useEffect(() => {
    if (product) {
      setImages([product.img_principal, ...product.galeria])
      setLoading(true)
      resources.products_related
        .all(product.id, 1)
        .then((response) => setRelatedProducts(response.data))
      setLoading(false)
    }
  }, [product])

  const handleBuyNow = () => {
    const item = generateCartItem(
      {
        ...product,
        precio: {
          cantidad: product.precio,
          moneda: product.precio_currency,
        },
      },
      0
    )
    if (!isInCart(item.id)) {
      addItemToCart(item, 1)
      router.push('/checkout/')
    } else {
      router.push('/checkout/')
    }
  }

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col items-center mx-2 bg-background-100">
      <AppHeader title={t('pages.products')} />
      <div className="flex flex-col md:flex-row w-full 2xl:w-[60%] xl:w-[75%] md:justify-between my-8">
        <div className="md:w-[45%] flex flex-row justify-center items-start">
          <Carousel
            showStatus={false}
            showArrows={false}
            renderThumbs={() =>
              images.map((item) => (
                <div
                  className="active-resource-card flex flex-row justify-center"
                  key={item}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND}${item}`}
                    style={{
                      borderRadius: '6px',
                      objectFit: 'contain',
                    }}
                  />
                </div>
              ))
            }
            preventMovementUntilSwipeScrollTolerance
            swipeScrollTolerance={100}
            className={'w-full flex flex-col justify-center rounded-lg'}
          >
            {images.map((item) => (
              <div
                className="active-resource-card border rounded-3xl flex flex-row justify-center"
                key={item}
              >
                <figure
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => setHover(false)}
                  className="flex"
                  style={{
                    backgroundImage: hover
                      ? `url(${process.env.NEXT_PUBLIC_BACKEND}${item})`
                      : '',
                    borderRadius: '6px',
                    objectFit: 'contain',
                    backgroundColor: 'white',
                    ...state,
                  }}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND}${item}`}
                    style={{
                      borderRadius: '6px',
                      objectFit: 'contain',
                    }}
                  />
                </figure>
              </div>
            ))}
          </Carousel>
        </div>
        <div className="flex flex-col md:mt-0 md:w-1/2">
          <p className="text-xl md:text-3xl text-text-blue mb-2 md:mt-0">
            {i18n.language === 'es' ? product?.nombre : product?.nombre_ingles}
          </p>
          <div className="flex flex-col">
            <ThemeProvider theme={theme}>
              <div className="flex flex-row">
                {product?.etiquetas.map((tag) => (
                  <Chip
                    key={tag.pk}
                    sx={{ marginRight: 1, marginBottom: 1 }}
                    label={i18n.language === 'es' ? tag.nombre : tag.ingles}
                    color="error"
                  />
                ))}
              </div>
            </ThemeProvider>
            {product?.sku && (
              <p className="my-2">
                <span className="text-footer-background-300">SKU: </span>{' '}
                <span className="font-semibold text-footer-background-300">
                  {product.sku}
                </span>
              </p>
            )}
          </div>
          {data && data.mayorista ? (
            <>
              <div className="my-4 md:mb-0 md:my-0 text-button font-bold text-xl md:text-3xl">
                US${parseFloat(product.precio_b2b).toFixed(2)}
              </div>
            </>
          ) : (
            <>
              {!product?.promocion.activo && (
                <div className="my-4 md:mb-0 md:my-0 text-button font-bold text-xl md:text-3xl">
                  US${parseFloat(product?.precio).toFixed(2)}
                </div>
              )}
              {product?.promocion.activo && (
                <div className="flex flex-col leading-3">
                  <p className="my-4 md:mb-0 md:my-0 text-button font-bold text-xl md:text-3xl">
                    US$
                    {parseFloat(
                      product?.precio -
                        (product?.precio * product?.promocion.descuento) / 100
                    ).toFixed(2)}{' '}
                  </p>
                  <div className="flex flex-row my-2">
                    <div className="bg-button flex rounded-md px-1 mr-1 text-background-100 text-sm">
                      -{parseFloat(product?.promocion.descuento).toFixed(0)}%
                    </div>
                    <p className="my-0 md:ml-1 md:pt-[0.15rem] text-text-100 text-sm md:text-sm line-through">
                      {' '}
                      US${parseFloat(product?.precio).toFixed(2)}
                    </p>
                  </div>
                </div>
              )}
              {product?.precioxlibra !== 0 && (
                <div className="mb-2 md:mb-0 md:my-0 text-text-100 text-sm md:text-base">
                  US${parseFloat(product?.precioxlibra).toFixed(2)}/
                  {product?.um}
                </div>
              )}
            </>
          )}
          <p className="mb-2">
            <span className="font-semibold text-footer-background-300">
              {t('products.subcategory')}:
            </span>{' '}
            <span className="font-semibold text-text-100">
              {product?.subcategoria}
            </span>
          </p>
          <p className="mb-2">
            <span className="font-semibold text-footer-background-300">
              {t('products.provider')}:
            </span>{' '}
            <Link
              href={{ pathname: '/', query: { id: product?.proveedor?.pk } }}
            >
              <span className="font-semibold text-text-100 underline hover:text-text-blue">
                {product?.proveedor?.nombre}
              </span>
            </Link>
          </p>
          <p className="mb-1">
            <span className="font-semibold text-footer-background-300">
              {t('products.brand')}:
            </span>{' '}
            <span className="font-semibold text-text-100">
              {product?.marca?.nombre}
            </span>
          </p>
          <div
            className={`flex flex-wrap w-full ${
              Number(product?.cant_inventario) > 0 ? 'mb-4' : 'mb-1'
            } mt-4`}
          >
            {product?.grupos.map((item) => (
              <div className="text-footer-background-300 w-1/4" key={item.pk}>
                <RelatedCard item={item} />
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            {Number(product?.cant_inventario) > 0 ? (
              <div className="flex flex-row justify-between w-11/12 mb-4">
                <div className="w-6/12 md:w-5/12">
                  <div className="flex flex-row justify-between">
                    <div className="hover:cursor-pointer">
                      <AddToCart
                        data={{
                          ...product,
                          precio: {
                            cantidad: product?.precio,
                            moneda: product?.precio_currency,
                          },
                        }}
                        size={[31.5, 26]}
                        text={t('home.addCart')}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="bg-footer-background-200 w-6/12 shadow-lg text-background-100 py-1 text-center rounded-md hover:cursor-pointer hover:opacity-90"
                  onClick={handleBuyNow}
                >
                  {t('home.shopNow')}
                </div>
              </div>
            ) : (
              <div className="bg-button text-background-300 px-2 rounded-md mb-4 text-center w-1/3">
                {t('oos')}
              </div>
            )}
            <div className="flex flex-row text-button mt-1 hover:cursor-pointer hover:opacity-90">
              <AddToFav
                data={product}
                text={'Añadir a favoritos'}
                success={'En favoritos'}
              />
            </div>
            <div className="flex flex-row items-center text-text-100 mt-3">
              <div className="flex flex-row items-center">
                <AccessTimeIcon fontSize="small" />
                <span className="ml-1 mt-[0.2rem]">
                  {i18n.language === 'es'
                    ? product?.tiempo_envio
                    : product?.tiempo_envio_ingles}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {productIsLoading && <>Loading...</>}
      <div className="w-full 2xl:w-[60%] xl:w-[75%] flex flex-col items-center md:mt-4 mb-8">
        <Box sx={{ width: '95%', borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              sx={{ color: '#111b2c' }}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label={t('products.description')} {...a11yProps(0)} />
              <Tab label={t('products.shipmentsFrom')} {...a11yProps(1)} />
            </Tabs>
          </Box>
          <AppTabPanel value={value} index={0}>
            <p className="text-footer-background-300">
              {i18n.language === 'es'
                ? product?.descripcion
                : product?.descripcion_ingles}
            </p>
          </AppTabPanel>
          <AppTabPanel value={value} index={1}>
            <p className="text-footer-background-300">
              {product?.municipios.map((item) => `${item.nombre}, `)}
            </p>
          </AppTabPanel>
        </Box>
      </div>
      <div className="w-full 2xl:w-[90%] xl:w-[80%] mb-20 mt-10">
        <p className="font-bold text-center text-xl mb-2 md:mb-4">
          {t('products.relatedProducts')}
        </p>
        <ProductsCarousel products={relatedProducts} />
      </div>
    </div>
  )
}

// export async function getStaticPaths() {
//   const { products } = await fetchAllProducts()

//   const paths = products.map((product) => ({
//     params: { id: product.id.toString() },
//   }))

//   return { paths, fallback: true }
// }

// export async function getStaticProps({ params }) {
//   const { product, apiError } = await fetchOneProduct(params.id)

//   return {
//     props: {
//       product,
//       apiError,
//     },
//     revalidate: 10,
//   }
// }

// async function fetchAllProducts() {
//   let apiError = ''
//   let products = []
//   try {
//     products = await (await resources.products.all()).data
//   } catch (error) {
//     apiError = error.message
//   }
//   return { products, apiError }
// }

// async function fetchOneProduct(id) {
//   let apiError = ''
//   let product = {}
//   try {
//     product = await (await resources.products.one(id)).data
//     console.log('🚀 ~ file: [id].jsx:393 ~ fetchOneProduct ~ product', product)
//   } catch (error) {
//     apiError = error.message
//   }
//   return { product, apiError }
// }

Product.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>
}

export default Product
