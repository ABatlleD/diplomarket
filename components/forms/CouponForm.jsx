import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import { useTranslation } from 'react-i18next'
import resources from '../../restapi/resources'
import GiftIcon from '../icons/gift-icon'
import TimerLoadingIcon from '../icons/timer-loading-icon'
import CheckIcon from '../icons/check-icon'

function CouponForm({ address }) {
  const { coupon } = address
  const { t } = useTranslation()
  return (
    <>
      <h6 className="font-bold mb-2 text-center">
        {t('checkout.coupon.title')}
      </h6>
      <Grid container spacing={2} className="apps-download">
        <Grid item xs={12}>
          <Coupon coupon={coupon} />
        </Grid>
      </Grid>
    </>
  )
}

function Coupon({ coupon }) {
  const [data, setData] = useState(undefined)
  const [message, setMessage] = useState(undefined)
  const [getCoupon, setCoupon] = coupon
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()

  const handleChange = (event) => {
    const value = event.target.value
    setData(value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    !loading && resources.coupon
      .get(data)
      .then((response) => {
        const response_data = response.data
        if ( 
          !response_data?.descuento || 
          !response_data?.cupon
        ) {
          setLoading(false)
          setMessage(t("checkout.coupon.not_exist"))
          return
        }
        setCoupon({
          cupon: response_data.cupon,
          descuento: response_data.descuento,
          message: `${t("checkout.coupon.valid")} ${response_data.descuento}%`,
        })
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        setMessage(t("checkout.coupon.not_exist"))
      })
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <form method="POST" onSubmit={handleSubmit}>
        <div className="h-13 flex w-full items-center rounded-full border bg-gray-100 pl-3">
          <input className="w-full appearance-none bg-gray-100 outline-none focus:outline-none active:outline-none" type="coupon" name="code" id="coupon" placeholder={t("checkout.coupon.apply")} value={data || getCoupon?.cupon} onChange={handleChange} disabled={getCoupon} />
          <button type="submit" className="flex items-center rounded-full bg-gray-800 px-3 py-1 text-sm text-white outline-none hover:bg-gray-700 focus:outline-none active:outline-none disabled:bg-gray-700 md:px-4" disabled={loading || getCoupon}>
            {loading ? <TimerLoadingIcon /> : getCoupon ? <CheckIcon /> : <GiftIcon />}
            <span className="font-medium">{t("checkout.coupon.apply")}</span>
          </button>
        </div>
      </form>
      {getCoupon?.message || message ? <p className="font-bold pt-1 text-button">{getCoupon?.message || message}</p> : <></>}
    </div>
  )
}

// icon check


// icon loading


// icon gift


export default CouponForm
