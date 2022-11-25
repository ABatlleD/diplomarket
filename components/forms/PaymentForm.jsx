import React from 'react'
import Grid from '@mui/material/Grid'
import { useConfig } from '../../restapi/config'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

function PaymentForm({ address }) {
  const { typePay } = address
  const { pasarelas } = useConfig()
  const [getTypePay, setTypePay] = typePay
  const { t } = useTranslation()
  return (
    <>
      <h6 className="mb-1">
        {t('checkout.payment_method.title')}
      </h6>
      <Grid container spacing={2} className="apps-download">
        {pasarelas?.paypal && <Grid item xs={6}>
          <a href="#!" className="" onClick={() => {
            setTypePay('paypal')
          }}>
            <img className={getTypePay === 'paypal' ? 'border-2 rounded-lg border-button w-auto' : 'w-auto'} src="/assets/payment/paypal/paypal.png" alt="paypal" />
          </a>
          {getTypePay === 'paypal' && <p className="text-md pt-1 text-button text-sm">{t('checkout.payment_method.paypal_tax')}</p>}
        </Grid>}
        {pasarelas?.tropipay && <Grid item xs={6}>
          <a href="#!" onClick={() => {
            setTypePay('tropipay')
          }}>
            <img className={getTypePay === 'tropipay' ? 'border-2 rounded-lg border-button w-auto' : 'w-auto'} src="/assets/payment/tropipay/tropipay.png" alt="tropipay" />
          </a>
        </Grid>}
        {pasarelas?.zelle && <Grid item xs={6}>
          <a href="#!" onClick={() => {
            setTypePay('zelle')
          }}>
            <img className={getTypePay === 'zelle' ? 'border-2 rounded-lg border-button w-auto' : 'w-auto'} src="/assets/payment/zelle/zelle.png" alt="zelle" />
          </a>
        </Grid>}
        {pasarelas?.directo && <Grid item xs={6}>
          <a href="#!" onClick={() => {
            setTypePay('directo')
          }}>
            <img className={getTypePay === 'directo' ? 'border-2 rounded-lg border-button w-auto' : 'w-auto'} src="/assets/payment/directo/directo.png" alt="directo" />
          </a>
        </Grid>}
        {pasarelas?.banco && <Grid item xs={6}>
          <a href="#!" onClick={() => {
            setTypePay('banco')
          }}>
            <img className={getTypePay === 'banco' ? 'border-2 rounded-lg border-button w-auto' : 'w-auto'} src="/assets/payment/banco/banco.png" alt="banco" />
          </a>
        </Grid>}
      </Grid>
    </>
  )
}

PaymentForm.propTypes = {
  address: PropTypes.any
}

export default PaymentForm
