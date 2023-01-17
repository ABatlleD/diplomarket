import React, { useEffect, useState } from 'react'
import { Chip, Modal, Fade } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { useTranslation } from 'react-i18next'
import { useCart } from '../../store/cart/cart.context'
import { generateCartItem } from '../../store/cart/generate-cart-item'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import localFont from '@next/font/local'

const AddToCart = dynamic(() => import('../cart/AddCart'))
const AddToFav = dynamic(() => import('../fav/AddFav'))

const arial = localFont({ src: '../../public/assets/font/arial/Arial.ttf' })

const theme = createTheme({
  palette: {
    error: {
      main: '#b12024',
      contrastText: '#fff',
    },
  },
})

function QuickView({
  openQuickView = false,
  setOpenQuickView = () => {},
  product,
}) {
  const [images, setImages] = useState([])
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const { data } = useSession()

  const { addItemToCart, isInCart } = useCart()

  const resizeTitle = (string, maxLength) => {
    return string?.length > maxLength
      ? `${string.slice(0, maxLength)}...`
      : string
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
        sx={{ overflowY: 'scroll' }}
      >
        <Fade in={openQuickView}>
          <main className={arial.className}>
            <div className="flex z-50 flex-col shadow-2xl bg-background-100 w-11/12 md:4/5 xl:w-2/5 p-2 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
              <div className="flex flex-row justify-end mb-6">
                <HighlightOffIcon
                  className="hover:cursor-pointer text-footer-background-300"
                  onClick={() => setOpenQuickView(false)}
                />
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-start md:justify-center w-full mb-6">
                <div className="flex flex-row w-2/3 mb-2 md:mb-0 md:w-[35%] justify-center">
                  <Carousel
                    showArrows={true}
                    showStatus={false}
                    showThumbs={false}
                    preventMovementUntilSwipeScrollTolerance
                    swipeScrollTolerance={100}
                    className={
                      'border w-full flex flex-row items-center rounded-lg h-[16rem] md:h-[14rem]'
                    }
                  >
                    {images.map((item) => (
                      <div
                        className="active-resource-card w-full h-full"
                        key={item}
                      >
                        <img
                          src={`${process.env.NEXT_PUBLIC_BACKEND}${item}`}
                          alt="..."
                          style={{
                            maxHeight: '200px',
                            borderRadius: '6px',
                            objectFit: 'contain',
                          }}
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
                <div className="md:w-[2%]"></div>
                <div className="flex flex-col w-full px-4 md:w-[60%]">
                  <p className="text-lg md:text-lg 2xl:text-lg text-text-blue">
                    {i18n.language === 'es'
                      ? product.nombre
                      : product.nombre_ingles}
                  </p>
                  <div className="flex flex-col mb-2">
                    {product.etiquetas && product.etiquetas.length > 0 && (
                      <ThemeProvider theme={theme}>
                        <div className="flex flex-row mr-2 my-1">
                          {product.etiquetas.map((tag) => (
                            <Chip
                              key={tag.pk}
                              sx={{
                                marginRight: 1,
                                marginBottom: 1,
                                borderRadius: '6px',
                              }}
                              label={tag.nombre}
                              color="error"
                            />
                          ))}
                        </div>
                      </ThemeProvider>
                    )}
                    {product.sku && (
                      <p>
                        <span className="font-semibold text-sm md:text-base text-footer-background-300">
                          SKU:{' '}
                        </span>{' '}
                        <span className="font-semibold text-sm md:text-base text-footer-background-300">
                          {product.sku}
                        </span>
                      </p>
                    )}
                  </div>
                  {data && data.mayorista ? (
                    <>
                      <div className="my-0 md:mb-0 md:my-0 text-button font-bold text-2xl md:text-lg">
                        US${product.precio_b2b?.cantidad || product.precio_b2b}
                      </div>
                    </>
                  ) : (
                    <>
                      {!product.promocion?.activo && (
                        <div className="my-0 md:mb-0 md:my-0 text-button font-bold text-2xl md:text-lg">
                          US${product.precio?.cantidad || product.precio}
                        </div>
                      )}
                      {product.promocion?.activo && (
                        <div className="flex flex-col leading-3">
                          <p className="my-0 md:mb-0 md:my-0 text-button font-bold text-2xl md:text-base">
                            US$
                            {(
                              (product.precio?.cantidad || product.precio) -
                              ((product.precio?.cantidad || product.precio) *
                                product.promocion.descuento) /
                                100
                            ).toFixed(2)}{' '}
                          </p>
                          <div className="flex flex-row my-2">
                            <div className="bg-button flex rounded-md px-1 mr-1 text-background-100 text-sm md:text-base">
                              -{product.promocion.descuento}%
                            </div>
                            <p className="my-0 md:ml-1 md:pt-[0.15rem] text-text-100 text-sm md:text-base line-through">
                              {' '}
                              US${product.precio?.cantidad || product.precio}
                            </p>
                          </div>
                        </div>
                      )}
                      {typeof product.precioxlibra === 'number' &&
                        product.precioxlibra !== 0 && (
                          <div className="mb-2 md:mb-0 md:my-0 text-text-100 text-sm md:text-base">
                            US${product.precioxlibra}/{product.um}
                          </div>
                        )}
                      {product.precioxlibra?.cantidad !== undefined &&
                        product.precioxlibra?.cantidad !== '0.00' && (
                          <div className="mb-2 md:mb-0 md:my-0 text-text-100 text-sm md:text-base">
                            US${product.precioxlibra?.cantidad}/{product.um}
                          </div>
                        )}
                    </>
                  )}
                  <p className="text-xs md:text-base text-text-100 mb-3">
                    {resizeTitle(
                      i18n.language === 'es'
                        ? product.descripcion
                        : product.descripcion_ingles,
                      300
                    )}
                  </p>
                  <div className="flex flex-col">
                    <div className="flex flex-row justify-between mb-4">
                      <div className="w-7/12">
                        <div className="flex flex-row justify-between">
                          <div className="hover:cursor-pointer">
                            {Number(product.cant_inventario) > 0 ? (
                              <AddToCart
                                data={product}
                                size={[26, 26]}
                                text={t('home.addCart')}
                              />
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </div>
                      {Number(product.cant_inventario) > 0 ? (
                        <div
                          className="bg-footer-background-200 w-5/12 shadow-lg text-background-100 py-1 text-center text-sm md:text-base rounded-md hover:cursor-pointer hover:opacity-90"
                          onClick={handleBuyNow}
                        >
                          {t('home.shopNow')}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="flex flex-row text-button hover:cursor-pointer hover:opacity-90 text-sm md:text-base">
                      <AddToFav
                        data={product}
                        text={t('fav.add')}
                        success={t('fav.in')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </Fade>
      </Modal>
    </>
  )
}

export default QuickView
