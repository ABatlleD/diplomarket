import React from 'react'
import Grid from '@mui/material/Grid'
import { useConfig } from '../../restapi/config'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

function PaymentForm({ address }) {
  const { typePay } = address
  const { pasarelas } = useConfig()
  const [getTypePay, setTypePay] = typePay
  const { t } = useTranslation('', {
    keyPrefix: 'checkout'
  })
  return (
    <>
      <h6 className="mb-1">
        {t('paymentMethod')}
      </h6>
      <Grid container spacing={2} className="apps-download">
        {pasarelas?.paypal && <Grid item xs={6}>
          <a href="#!" className="" onClick={() => {
            setTypePay('paypal')
          }}>
            <img className={getTypePay === 'paypal' ? 'active w-auto' : 'w-auto'} src="/assets/payment/paypal/paypal.png" alt="paypal" />
          </a>
          {getTypePay === 'paypal' && <p className="text-md pt-1 text-dm-red">{t('tax_paypal_help')}</p>}
        </Grid>}
        {pasarelas?.tropipay && <Grid item xs={6}>
          <a href="#!" onClick={() => {
            setTypePay('tropipay')
          }}>
            <img className={getTypePay === 'tropipay' ? 'active w-auto' : 'w-auto'} src="/assets/payment/tropipay/tropipay.png" alt="tropipay" />
          </a>
        </Grid>}
        {pasarelas?.zelle && <Grid item xs={6}>
          <a href="#!" onClick={() => {
            setTypePay('zelle')
          }}>
            <img className={getTypePay === 'zelle' ? 'active w-auto' : 'w-auto'} src="/assets/payment/zelle/zelle.png" alt="zelle" />
          </a>
        </Grid>}
        {pasarelas?.directo && <Grid item xs={6}>
          <a href="#!" onClick={() => {
            setTypePay('directo')
          }}>
            <img className={getTypePay === 'directo' ? 'active w-auto' : 'w-auto'} src="/assets/payment/directo/directo.png" alt="directo" />
          </a>
        </Grid>}
        {pasarelas?.banco && <Grid item xs={6}>
          <a href="#!" onClick={() => {
            setTypePay('banco')
          }}>
            <img className={getTypePay === 'banco' ? 'active w-auto' : 'w-auto'} src="/assets/payment/banco/banco.png" alt="banco" />
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
