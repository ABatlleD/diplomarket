import React, { useState } from 'react'
import Grid from '@mui/material/Grid'

import { Modal, Fade } from '@mui/material'

import Button from '@mui/material/Button'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import WhatsAppBusinessIcon from '../icons/whats-app-business-icon'
import { useTranslation } from 'react-i18next'

import { useRouter } from 'next/router'
import 'react-toastify/dist/ReactToastify.min.css'
import { useConfig } from '../../restapi/config'

const DirectPayment = ({ openDirectModal, setOpenDirectModal, modalData }) => {
  const { directo_email } = useConfig()
  const [clip, setClip] = useState(false)
  const { push } = useRouter()

  const { t } = useTranslation()

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openDirectModal}
      onClose={() => {
        push(`/payment-direct?notification=${encodeURIComponent(modalData?.ticket?.whatsapp_notification)}`).then()
        setOpenDirectModal(false)
      }}
      closeAfterTransition
      sx={{ overflowY: 'scroll' }}
    >
      <Fade in={openDirectModal}>
        <div className="flex z-50 flex-col shadow-2xl bg-background-100 md:rounded-xl w-full md:w-auto md:max-w-xl my-4 md:my-10 mx-auto p-4">
          <h1 className="mb-4 md:mb-6 text-center text-lg font-bold">
            {t('direct.title')}
          </h1>
          <div className="h-full">
            <Grid container spacing={2}>
              <div className='w-full flex justify-center'>
                <Grid item xs={10} md={6}>
                  <img className="mx-auto h-32" src="/assets/payment/directo/ticket.svg"></img>
                </Grid>
              </div>
              <Grid item xs={12}>
                <div className="text-center">
                  <h1>{t('direct.ticket')}: </h1>
                  <div className="flex flex-grow justify-center">
                    <input className="border-blue-500 border-solid border w-32 rounded py-2 px-2" type="text" placeholder={modalData?.ticket?.code} value={modalData?.ticket?.code} disabled />
                    <button
                      className="bg-button hover:bg-blue-800 ml-1 text-white font-bold px-2 border border-blue-700 rounded"
                      onClick={() => {
                        if (navigator) {
                          navigator.clipboard.writeText(modalData?.ticket?.code)
                          setClip(true)
                        }
                      }}
                    >
                      {!clip ? <ContentPasteIcon /> : <AssignmentTurnedInIcon />}
                    </button>
                  </div>
                  <p className={`mt-1 text-footer-background-100 ${!clip ? 'hidden' : 'block'}`}>
                    {t('direct.copied')}
                  </p>
                </div>
              </Grid>
              <Grid item xs={12}>
                <p className="mx-auto mb-2 mt-4 text-justify font-weight-bold">
                  Total: ${ parseFloat(modalData?.total).toFixed(2) } USD
                </p>
                <p className="mx-auto text-justify">
                  {t('direct.message_first')} <span className="underline text-red-700">{directo_email}</span>{t('direct.message_second')}{/* <span className="underline text-red-700"><a href="mailto:ordenes@diplomarket.com">ordenes@diplomarket.com</a></span> */}
                </p>
              </Grid>
              <Grid item xs={12} md={6}>
                <a 
                  className="py-[5px] px-3 w-full cursor-pointer inline-flex justify-center items-center gap-2 uppercase border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-dm-red transition-all text-sm"
                  target="_blank"
                  rel="noreferrer"
                  href={modalData?.ticket?.whatsapp_notification}
                >
                  <WhatsAppBusinessIcon />
                  {t('direct.notification_order')}
                </a>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className='bg-button'>
                  <Button variant="contained" color="error" fullWidth type="submit" onClick={() => {
                    push(`/payment-direct?notification=${encodeURIComponent(modalData?.ticket?.whatsapp_notification)}`).then()
                    setOpenDirectModal(false)
                  }}>{t('direct.close')}</Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

export default DirectPayment
