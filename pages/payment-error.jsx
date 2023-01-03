import React from 'react'
import Image from 'next/image'
import { Button } from '@mui/material'
import Router from 'next/router'
import { useCart } from '../store/cart/cart.context'
import { useTranslation } from 'react-i18next'
import ErrorPayImg from '../public/assets/user-message/105614.png'
import dynamic from 'next/dynamic'

const MainLayout = dynamic(() => import('../layouts/MainLayout'))

const PaymentError = () => {
  const { t } = useTranslation()
  const { resetCart } = useCart()
  resetCart()
  return (
      <div className="flex justify-center py-10">
        <div className="container max-w-sm">
          <div className="flex justify-center">
            <div className="col-md-10">
              <div className="row justify-content-center">
                <div className="col-md-12 mb-3 text-center relative h-24 w-[40%]">
                  <Image src={ErrorPayImg} layout='fill' alt="logo" />
                </div>
                <div className='w-full text-center mb-4'>
                  <h3 className="heading mt-2 mb-1 text-2xl font-bold">{t('pay_error.title')}</h3>
                </div>
                <div className="col-md-12 mt-1 mb-3 text-justify">
                  <p>{t('pay_error.description')}</p>
                </div>
                <div className="col-md-12">
                  <Button
                    className='bg-button'
                    fullWidth
                    variant="contained"
                    color="error"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => {
                      Router.push('/')
                    }}
                  >
                    {t('back')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

PaymentError.getLayout = function getLayout(page) {
  return (
    <MainLayout pageProps={page}>
      {page}
    </MainLayout>
  )
}

export default PaymentError
