import React, { useState } from 'react'
import Grid from '@mui/material/Grid'

import { Modal, Fade } from '@mui/material'

import Button from '@mui/material/Button'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'

import { useTranslation } from 'react-i18next'

import { useRouter } from 'next/router'
import 'react-toastify/dist/ReactToastify.min.css'
import { useConfig } from '../../restapi/config'

const ZellePayment = ({ openZelleModal, setOpenZelleModal, modalData }) => {
  // eslint-disable-next-line no-unused-vars
  const { zelle: { zelle_email, zelle_time } } = useConfig()
  const [clip, setClip] = useState(false)
  const { push } = useRouter()

  const { t } = useTranslation()

  return (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openZelleModal}
        onClose={() => {
          if (!modalData?.no_redirect)
            push('/').then()
          setOpenZelleModal(false)
        }}
        closeAfterTransition
        sx={{ overflowY: 'scroll' }}
      >
        <Fade in={openZelleModal}>
        <div className="flex z-50 flex-col shadow-2xl bg-background-100 md:rounded-xl w-full md:w-auto md:max-w-xl my-4 md:my-10 mx-auto p-4">
          <h1 className="mb-4 md:mb-6 text-center text-lg font-bold">
            {t('direct.title')}
          </h1>
          <div className="h-full">
            <Grid container>
              <div className='w-full flex justify-center mb-4'>
                <Grid item xs={10} md={6}>
                  <img className="mx-auto h-32" src="/assets/payment/zelle/ticket.svg"></img>
                </Grid>
              </div>
              <Grid item xs={12}>
                <div className="text-center">
                  <h1 className='mb-2'>{t('direct.ticket')}: </h1>
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
                <p className="mx-auto mb-2 mt-4 text-justify font-bold">
                  TOTAL: ${ parseFloat(modalData?.total).toFixed(2) } USD
                </p>
                <p className="mx-auto text-justify font-bold mb-2">
                  {t('zelle.from_pay')} <span className="underline text-red-700 font-normal cursor-pointer" onClick={() => {
                        if (navigator) {
                          navigator.clipboard.writeText(zelle_email)
                        }
                      }}>{zelle_email}</span>
                </p>
                <p className="mx-auto text-justify font-bold mb-4">
                  {t('zelle.from_name')} <span className="underline text-red-700 font-normal cursor-pointer" onClick={() => {
                        if (navigator) {
                          navigator.clipboard.writeText("Cuspinera Surl, LLc")
                        }
                      }}>Cuspinera Surl, LLc</span>
                </p>
                <p className="mx-auto text-justify mb-4">
                  {t('zelle.message')}
                </p>
              </Grid>
              <Grid item xs={12}>
                <div className='bg-button'>
                  <Button variant="contained" color="error" fullWidth type="submit" onClick={() => {
                    if (!modalData?.no_redirect)
                      push('/').then()
                    setOpenZelleModal(false)
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

export default ZellePayment
