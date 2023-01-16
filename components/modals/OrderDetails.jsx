import React from 'react'
import { Modal, Fade } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Josefin_Sans } from '@next/font/google'
import dynamic from 'next/dynamic'
import localFont from '@next/font/local'

const OrderProductItem = dynamic(() => import('../orders/OrderProductItem'))

const js = Josefin_Sans({
  weight: '400',
  subsets: ['latin'],
})

const arial = localFont({ src: '../../public/assets/font/arial/Arial.ttf' })

function OrderDetails({
  openOrderDetails = false,
  setOpenOrderDetails = () => {},
  item,
}) {
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        onClose={() => setOpenOrderDetails(false)}
        open={openOrderDetails}
        closeAfterTransition
        sx={{ overflowY: 'scroll' }}
      >
        <Fade in={openOrderDetails}>
          <div className="flex z-50 flex-col shadow-2xl bg-background-100 w-11/12 md:4/5 xl:w-1/3 mt-4 md:mt-10 mx-auto p-4">
            <div className={arial.className}>
              <div className="flex flex-row justify-between mb-6">
                <div className="font-bold text-lg">Orden: {item.id}</div>
                <HighlightOffIcon
                  className="hover:cursor-pointer"
                  onClick={() => setOpenOrderDetails(false)}
                />
              </div>
              <div className="font-bold">Productos</div>
              <div className="overflow-auto mb-4">
                {item.components?.length > 0 ? (
                  item.components.map((item, key) => (
                    <OrderProductItem
                      item={item}
                      key={key}
                      variant={'pillVertical'}
                    />
                  ))
                ) : (
                  <></>
                )}
              </div>
              <p>
                <span className="font-bold">Precio de entrega: </span>US$
                {parseFloat(item.precio_envio).toFixed(2)}
              </p>
              <p className="mb-4">
                <span className="font-bold">Total: </span>US$
                {parseFloat(item.total).toFixed(2)}
              </p>
              <div className="mt-2">
                <p className="text-text-100 font-semibold mb-2">
                  Datos del destinatario:
                </p>
                <div className="border p-2 bg-[#f2f2f2]">
                  <p style={{ whiteSpace: 'pre-wrap' }}>{item.destinatario}</p>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  )
}

export default OrderDetails
