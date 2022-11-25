import React, { useEffect, useState } from 'react'
import { Chip, Modal, Fade } from '@mui/material'
import PropTypes from 'prop-types'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import AddToCart from '../cart/AddCart'
import AddToFav from '../fav/AddFav'
import { useTranslation } from 'react-i18next'
import { useCart } from '../../store/cart/cart.context'
import { generateCartItem } from '../../store/cart/generate-cart-item'
import { useRouter } from 'next/router'

const theme = createTheme({
  palette: {
    error: {
      main: '#b12024',
      contrastText: '#fff'
    }
  }
})

function QuickView({ openQuickView = false, setOpenQuickView = () => {}, product }) {
  const [images, setImages] = useState([])
  const { t, i18n } = useTranslation()
  const router = useRouter()

  const {
    addItemToCart,
    isInCart
  } = useCart()

  const resizeTitle = (string, maxLength) => {
    return string?.length > maxLength ? `${string.slice(0, maxLength)}...` : string
  }

  useEffect(() => {
    if (product.img_principal && product.galeria) {
      setImages([product.img_principal, ...product.galeria])
    }
  }, [product])

  const handleBuyNow = () => {
    const item = generateCartItem(product, 0)
    if (!isInCart(item.id)) {
      addItemToCart(item, 1)
      router.push('/checkout')
    } else {
      router.push('/checkout')
    }
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openQuickView}
        onClose={() => setOpenQuickView(false)}
        closeAfterTransition
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={openQuickView}>
          <div className='flex flex-col shadow-2xl bg-background-100 w-11/12 md:4/5 xl:w-3/5 mt-4 md:mt-10 mx-auto p-2'>
            <div className='flex flex-row justify-end mb-6'>
              <HighlightOffIcon className='hover:cursor-pointer' onClick={() => setOpenQuickView(false)} />
            </div>
            <div className='flex flex-col md:flex-row md:justify-center items-center w-full mb-6'>
              <div className='flex flex-row w-full mb-2 md:mb-0 md:w-[46%] justify-center'>
                <Carousel
                  showArrows={true}
                  showStatus={false}
                  showThumbs={false}
                  preventMovementUntilSwipeScrollTolerance
                  swipeScrollTolerance={100}
                  className={'border w-full rounded-lg h-[20rem] md:h-[19rem]'}
                >
                  {images.map((item) => (
                    <div className='active-resource-card' key={item}>
                      <img
                        src={`${process.env.NEXT_PUBLIC_BACKEND}${item}`}
                        alt="..."
                        style={{
                          maxHeight: '300px',
                          borderRadius: '6px',
                          objectFit: 'contain'
                        }}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
              <div className='md:w-[3%]'></div>
              <div className='flex flex-col w-full md:w-[46%]'>
                <p className='text-lg mb-2'>{i18n.language === 'es' ? product.nombre : product.nombre_ingles}</p>
                <div className='flex flex-row mb-2'>
                  {(product.etiquetas && product.etiquetas.length > 0) && (
                    <ThemeProvider theme={theme}>
                      <div className='felx flex-row mr-2 my-1 md:my-2 h-7'>
                        {product.etiquetas.map((tag) => (
                          <Chip key={tag.pk} sx={{ marginRight: 1, marginBottom: 1, borderRadius: '6px' }} label={tag.nombre} color="error" />
                        ))}
                      </div>
                    </ThemeProvider>
                  )}
                  {product.sku &&
                    <p className='mt-2'>
                      <span className='font-semibold'>SKU: </span> <span className='font-semibold'>{product.sku}</span>
                    </p>
                  }
                </div>
                <p className='text-button mb-2 text-xl font-semibold'>${product.precio?.cantidad} {product.precio?.moneda}</p>
                {product.precioxlibra && product.precioxlibra?.cantidad !== '0.00' && (
                  <p className='mb-2 text-xl font-semibold'>${product.precioxlibra?.cantidad} {product.precioxlibra?.moneda}/{product.um}</p>
                )}
                <p className='text-xs text-text-100 mb-3'>{resizeTitle(i18n.language === 'es' ? product.descripcion : product.descripcion_ingles, 300)}</p>
                <div className='flex flex-col'>
                  <div className='flex flex-row justify-between mb-4'>
                    <div className='w-4/12 md:w-3/12'>
                      <div className='flex flex-row justify-between'>
                        <div
                          className='hover:cursor-pointer'
                        >
                          {Number(product.cant_inventario) > 0
                            ? (
                                <AddToCart data={product} />
                              )
                            : <></>}
                        </div>
                      </div>
                    </div>
                    {Number(product.cant_inventario) > 0
                      ? (
                        <div
                          className='bg-footer-background-200 w-6/12 shadow-lg text-background-100 py-1 text-center rounded-md hover:cursor-pointer hover:opacity-90'
                          onClick={handleBuyNow}
                        >
                          {t('home.shopNow')}
                        </div>
                        )
                      : <></>}
                  </div>
                  <div className='flex flex-row text-button mt-1 hover:cursor-pointer hover:opacity-90'>
                    <AddToFav data={product} text={t('fav.add')} success={t('fav.in')}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  )
}

QuickView.propTypes = {
  openQuickView: PropTypes.bool,
  setOpenQuickView: PropTypes.func,
  product: PropTypes.object
}

export default QuickView
