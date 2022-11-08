import React, { useEffect, useState } from 'react'
import { Chip, Modal, Fade } from '@mui/material'
import PropTypes from 'prop-types'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

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
  const [amount, setAmount] = useState(1)

  const amountUpDown = (direction) => {
    if (direction === 'up') {
      setAmount(amount + 1)
    } else {
      if (amount > 1) {
        setAmount(amount - 1)
      }
    }
  }

  console.log(product)

  useEffect(() => {
    if (product.img_principal && product.galeria) {
      setImages([product.img_principal, ...product.galeria])
    }
  }, [product])

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
          <div className='flex flex-col shadow-2xl bg-background-100 w-11/12 md:4/5 xl:w-3/5 md:mt-10 mx-auto p-2'>
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
                        src={`http://127.0.0.1:8000${item}`}
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
                <p className='text-lg mb-2'>{product.nombre}</p>
                <div className='flex flex-row mb-2'>
                  {product.etiquetas && (
                    <ThemeProvider theme={theme}>
                      <div className='felx flex-row mr-2 my-1 md:my-2 h-7'>
                        {product.etiquetas.map((tag) => (
                          <Chip key={tag.pk} sx={{ marginRight: 1, marginBottom: 1, borderRadius: '6px' }} label={tag.nombre} color="error" />
                        ))}
                      </div>
                    </ThemeProvider>
                  )}
                  {product.sku &&
                    <p className='mb-8'>
                      <span className='font-semibold'>SKU: </span> <span className='font-semibold'>{product.sku}</span>
                    </p>
                  }
                </div>
                <p className='text-button mb-2 text-xl font-semibold'>{product.precio?.cantidad} {product.precio?.moneda}</p>
                <p className='text-xs text-text-100 mb-3'>{product.descripcion}</p>
                <div className='flex flex-row w-full'>
                  <div className='w-4/12'>
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
                  <div className='w-8/12'>
                    <div className='hover:opacity-90 py-1  w-full hover:cursor-pointer bg-footer-background-100 text-background-100 shadow-md text-center rounded-md'>
                      Add Cart
                    </div>
                  </div>
                </div>
                <div className='flex flex-row w-full mt-4'>
                  <div className='flex flex-row text-button w-5/12 mt-1 hover:cursor-pointer hover:opacity-90'>
                    <FavoriteBorderIcon />
                    <p>Add To Wishlist</p>
                  </div>
                  <div className='bg-whatsapp w-7/12 shadow-lg text-background-100 py-1 text-center rounded-md hover:cursor-pointer hover:opacity-90'> Shop Now</div>
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
