import React, { useState } from 'react'
import { Modal, Fade } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import dynamic from 'next/dynamic'
import localFont from '@next/font/local'
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const OrderProductItem = dynamic(() => import('../orders/OrderProductItem'))
const ZellePayment = dynamic(() => import("../modals/ZellePayment"))

const arial = localFont({ src: '../../public/assets/font/arial/Arial.ttf' })

function OrderDetails({
  openOrderDetails = false,
  setOpenOrderDetails = () => {},
  item,
}) {
  const { push } = useRouter()
  const { t } = useTranslation()
  const [modalData, setModalData] = useState({})
  const [openZelleModal, setOpenZelleModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const toast_message = {
    ready_link: t('profile.orders.ready_link'),
    error_link: t('profile.orders.error_link'),
    error_request: t('profile.orders.error_request'),
    error_contact: t('profile.orders.error_contact'),
  }
  return (
    <>
      <ZellePayment {...{ openZelleModal, setOpenZelleModal, modalData }} />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        onClose={() => setOpenOrderDetails(false)}
        open={openOrderDetails}
        closeAfterTransition
        sx={{ overflowY: 'scroll' }}
      >
        <Fade in={openOrderDetails}>
          <div className="flex z-50 flex-col shadow-2xl bg-background-100 w-11/12 md:4/5 xl:w-1/3 my-4 md:my-10 mx-auto p-4">
            <ToastContainer />
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
                {item.componentes?.length > 0 ? (
                  item.componentes.map((item, key) => (
                    <OrderProductItem
                      key={key}
                      item={item}
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
              {item.tipo === "zelle" && item.status === "PENDING" ? (
                <div className="w-full rounded-lg text-xl font-bold">
                  <button
                    className="rounded-lg"
                  >
                    <img
                      src="/assets/payment/zelle/boton-zelle.png"
                      className="bg-white"
                      onClick={() => {
                        setModalData({
                          ticket: {
                            code: item.id,
                          },
                          total: item.total,
                          no_redirect: true,
                        })
                        setOpenZelleModal(true) 
                      }}
                    />
                  </button>
                </div>
              ) : item.tipo === "tropipay" && item.status === "PENDING" && item.enlace !== "CONSUMIDO" ? (
                <div className="w-full rounded-lg text-xl font-bold">
                  <button
                    className="rounded-lg"
                    aria-disabled={loading}
                    onClick={(event) => {
                      setTimeout(function() {
                        event.target.disabled = true;
                      }, 0);
                      setLoading(true)
                      axios.post('/api/checkout/tpp', {order_id: item?.id}).then((payment) => {
                        const payment_data = payment?.data;
                        const url = payment_data?.enlace ?? '';
                        if (payment_data?.error) {
                          event.target.disabled = false;
                          setLoading(false)
                          toast.error(toast_message[payment_data?.message]);
                        } else if (window && !!url) {
                          event.target.disabled = false;
                          setLoading(false)
                          toast.info(toast_message[payment?.data?.message]);
                          push(`/payment-direct?tpp=${encodeURIComponent(url)}`).then()
                        } else {
                          event.target.disabled = false;
                          setLoading(false)
                          toast.error(toast_message.error_contact);
                        }
                      })
                    }}
                  >
                    <img
                      src="/assets/payment/tropipay/boton-tropipay.png"
                      className="bg-white"
                    />
                  </button>
                </div>
              ) : (<></>)}
              <div className="mt-2">
                <p className="text-text-100 font-semibold mb-2">
                  {t('profile.orders.recipient_data')}:
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
