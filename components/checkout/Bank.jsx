/* eslint-disable no-unused-expressions */
import React, { useState, useRef } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Checkbox } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import axios from 'axios'
import { toast } from 'react-toastify'
import Card from 'react-credit-cards-2'
import Link from 'next/link'
import { EXCLUSIVE_COUNTRIES } from '../../libs/constants'
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from '../../libs/format-credit-card'

import 'react-credit-cards-2/es/styles-compiled.css'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const Bank = ({ user, updateCart, checkCart, resetCart, addressee, delivery }) => {
  const [check, setCheck] = useState(false)
  const { t } = useTranslation()
  const formRef = useRef(null)
  const { push } = useRouter()
  const [data, setData] = useState({
    number: '',
    name: user ?? '',
    expiry: '',
    cvc: '',
    issuer: '',
    pais: '',
    focused: '',
    formData: null
  })
  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setData({ ...data, issuer })
    }
  }
  const handleInputFocus = ({ target }) => {
    setData({
      ...data,
      focused: target.name
    })
  }
  const handleInputChange = ({ target }) => {
    switch (target.name) {
      case 'number':
        target.value = formatCreditCardNumber(target.value)
        break
      case 'expiry':
        target.value = formatExpirationDate(target.value)
        break
      case 'cvc':
        target.value = formatCVC(target.value)
        break
      case 'pais':
        target.value
        break
      case 'estado':
        target.value
        break
      case 'locacion':
        target.value
        break
      case 'postal':
        target.value
        break
      case 'direccion':
        target.value
        break
      default:
        return
    }
    setData({ ...data, [target.name]: target.value })
  }
  const handleSubmit = e => {
    e.preventDefault()
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value
        return acc
      }, {})
    setData({ ...data, formData })
    updateCart(true)
    axios
      .post('/api/checkout/checkproducts', {
        products: checkCart
      })
      .then((payment) => {
        if (payment?.data?.failed) {
          toast.error(t('check_products'))
        } else {
          axios
            .post('/api/addressees', {
              addressee
            })
            .then((saveAddressee) => {
              if (
                payment?.data?.failed === false &&
                saveAddressee.data?.data
              ) {
                toast.info(
                  saveAddressee.data.message ??
                    t('contact_admin')
                )
                axios
                  .post('/api/checkout/addressees', {
                    amount: checkCart?.total,
                    currency: 'USD',
                    products: checkCart?.items,
                    addresses: saveAddressee.data.data,
                    delivery,
                    details: formData,
                    type: 'banco'
                  })
                  .then((payment) => {
                    const message = payment?.data?.message ?? false
                    const failed = payment?.data?.failed ?? false
                    if (failed) {
                      return toast.error(
                        t('check_products')
                      )
                    }
                    switch (message) {
                      case 401:
                        toast.success(
                          t('pay_complete')
                        )
                        resetCart()
                        push('/payment-success').then()
                        break
                      case 'success':
                        toast.success(
                          t('pay_complete')
                        )
                        resetCart()
                        push('/payment-success').then()
                        break
                      case 'error_payment':
                        toast.error(
                          t('pay_error')
                        )
                        break
                      case 'error_gateway':
                        toast.error(
                          t('pay_error_gateway')
                        )
                        resetCart()
                        push('/payment-error').then()
                        break
                      default:
                        resetCart()
                        push('/payment-error').then()
                        break
                    }
                  }).catch(() => {
                    push('/payment-error').then()
                  })
              } else {
                push('/payment-error').then()
              }
            })
            .then()
        }
      })
    formRef.current.reset()
  }
  const { name, number, expiry, cvc, pais, focused, issuer } = data

  const termsprivacy = (
    <Link href={'/terminos-privacidad'}>
      <span className='text-footer-background-200 underline hover:cursor-pointer font-bold'>{t('terms-privacy.title')}</span>
    </Link>
  )

  return (
    <div key="Payment">
      <div className="App-Payment">
        <Card
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={focused}
          callback={handleCallback}
        />
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="my-2">
            <input
              type="tel"
              name="number"
              className="py-2.5 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-white focus:ring-blue-600 transition-all dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              placeholder={t('checkout.review.placeholder.card')}
              pattern="[\d| ]{16,22}"
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className="flex space-x-3">
            <div className="w-1/2">
              <input
                type="tel"
                name="expiry"
                className="py-2.5 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-white focus:ring-blue-600 transition-all dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                placeholder={t('checkout.review.placeholder.expiry')}
                pattern="\d\d/\d\d"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div className="w-1/2">
              <input
                type="tel"
                name="cvc"
                className="py-2.5 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-white focus:ring-blue-600 transition-all dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                placeholder={t('checkout.review.placeholder.cvc')}
                pattern="\d{3,4}"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
          </div>
          <div className="flex space-x-3 mt-2">
            <div className="w-1/2">
              <FormControl sx={{ minWidth: '100%' }} size="small">
                <InputLabel id="pais">{t('checkout.review.placeholder.country')}</InputLabel>
                <Select
                  labelId="pais"
                  id="pais"
                  label={t('checkout.review.placeholder.country')}
                  name="pais"
                  value={pais}
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                >
                  <MenuItem value="">
                  </MenuItem>
                  {EXCLUSIVE_COUNTRIES.map((item, _) => (
                    <MenuItem value={item} key={_}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="w-1/2">
              <Tooltip title={t('checkout.review.placeholder.tooltip')}>
                <input
                  type="text"
                  name="estado"
                  className="py-2.5 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-white focus:ring-blue-600 transition-all dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder={t('checkout.review.placeholder.state')}
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </Tooltip>
            </div>
          </div>
          <div className="flex space-x-3 my-2">
            <div className="w-1/2">
              <input
                type="text"
                name="locacion"
                className="py-2.5 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-white focus:ring-blue-600 transition-all dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                placeholder={t('checkout.review.placeholder.city')}
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div className="w-1/2">
              <input
                type="text"
                name="postal"
                className="py-2.5 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-white focus:ring-blue-600 transition-all dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                placeholder={t('checkout.review.placeholder.zip')}
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
          </div>
          <div className="w-full">
            <input
              type="text"
              name="direccion"
              className="py-2.5 px-4 block w-full border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-white focus:ring-blue-600 transition-all dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              placeholder={t('checkout.review.placeholder.address')}
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <input type="hidden" name="issuer" value={issuer} />
          <div className="ZipCode flex flex-row mt-2">
            <Checkbox onChange={() => setCheck(!check)} />
            <p className='text-justify text-sm text-footer-background-300 font-semibold mt-[0.75rem]'>
              {t('auth.signup.agree')} {termsprivacy}.
            </p>
          </div>
          <div className="my-2">
            <button disabled={!check} className={`p-2 rounded-xl bg-dm-red text-white w-full uppercase ${!check ? 'opacity-30 hover:cursor-not-allowed' : ''}`}>{t('checkout.review.placeholder.pay')}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Bank
