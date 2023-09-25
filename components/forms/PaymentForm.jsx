import React from 'react'
import Grid from '@mui/material/Grid'
import { useConfig } from '../../restapi/config'
import { useTranslation } from 'react-i18next'
import PaymentEmptyIcon from '../icons/payment-empty'
import PreLoader from '../PreLoader'

function PaymentForm({ address }) {
  const { typePay } = address
  const { pasarelas, loading } = useConfig()
  const [getTypePay, setTypePay] = typePay
  const { t } = useTranslation()
  return (
    <>
      <h6 className="mb-1">
        {t('checkout.payment_method.title')}
      </h6>
      <Grid container spacing={2} className="apps-download">
        {
          loading && <Grid item xs={12}>
            <div className="flex flex-col justify-center items-center">
              <PreLoader />
            </div>
          </Grid>
        }
        {
          !loading && !pasarelas?.paypal && !pasarelas?.tropipay && !pasarelas?.zelle && !pasarelas?.directo && !pasarelas?.banco ?
          <>
            <Grid item xs={12}>
              <div className="flex flex-col justify-center items-center">
                <PaymentEmptyIcon />
                <p className="font-bold">{t('checkout.payment_method.empty')}</p>
              </div>
            </Grid>
          </> :
          <>
            {pasarelas?.paypal && <Grid item xs={6}>
              <button onClick={() => {
                setTypePay('paypal')
              }}>
                <img className={getTypePay === 'paypal' ? 'border-2 rounded-lg border-button w-auto' : 'rounded-lg w-auto'} src="/assets/payment/paypal/paypal.png" alt="paypal" />
              </button>
              {getTypePay === 'paypal' && <p className="text-md pt-1 text-button text-sm">{t('checkout.payment_method.paypal_info')}</p>}
            </Grid>}
            {pasarelas?.tropipay && <Grid item xs={6}>
              <button onClick={() => {
                setTypePay('tropipay')
              }}>
                <img className={getTypePay === 'tropipay' ? 'border-2 rounded-lg border-button w-auto' : 'rounded-lg w-auto'} src="/assets/payment/tropipay/tropipay.png" alt="tropipay" />
              </button>
              {getTypePay === 'tropipay' && <p className="text-md pt-1 text-button text-sm">{t('checkout.payment_method.tropipay_info')}</p>}
            </Grid>}
            {pasarelas?.zelle && <Grid item xs={6}>
              <button onClick={() => {
                setTypePay('zelle')
              }}>
                <img className={getTypePay === 'zelle' ? 'border-2 rounded-lg border-button w-auto' : 'rounded-lg w-auto'} src="/assets/payment/zelle/zelle.png" alt="zelle" />
              </button>
            </Grid>}
            {pasarelas?.directo && <Grid item xs={6}>
              <button onClick={() => {
                setTypePay('directo')
              }}>
                <img className={getTypePay === 'directo' ? 'border-2 rounded-lg border-button w-auto' : 'rounded-lg w-auto'} src="/assets/payment/directo/directo.png" alt="directo" />
              </button>
            </Grid>}
            {pasarelas?.banco && <Grid item xs={6}>
              <button onClick={() => {
                setTypePay('banco')
              }}>
                <img className={getTypePay === 'banco' ? 'border-2 rounded-lg border-button w-auto' : 'rounded-lg w-auto'} src="/assets/payment/bofa/banco.png" alt="banco" />
              </button>
            </Grid>}
          </>
        }
      </Grid>
    </>
  )
}

export default PaymentForm
