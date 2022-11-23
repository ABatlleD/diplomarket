import React from 'react'
import Image from 'next/image'
import { Button } from '@mui/material'
import Router from 'next/router'
import { useCart } from '../../store/cart/cart.context'
import { useTranslation } from 'react-i18next'
import MainLayout from '../../layouts/MainLayout'
// eslint-disable-next-line import/no-absolute-path
import ErrorPayImg from '/public/assets/user-message/105614.png'

const PaymentError = () => {
  const { t } = useTranslation('', {
    keyPrefix: 'user_info'
  })
  const { resetCart } = useCart()
  resetCart()
  return (
    <>
      <div className="content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="row justify-content-center">
                <div className="col-md-12 mb-3 text-center">
                  <Image src={ErrorPayImg} width={100} height={100} placeholder={'blur'} alt="logo" className="m-auto" />
                  <h3 className="heading mt-2 mb-1">{t('title_error')}</h3>
                </div>
                <div className="col-md-12 mt-1 mb-3 text-justify">
                  <p>{t('description_error')}</p>
                </div>
                <div className="col-md-12">
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => {
                      Router.push('/')
                    }}
                  >
                    {t('back_home')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

PaymentError.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default PaymentError
