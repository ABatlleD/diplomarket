import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { toast } from 'react-toastify'

const Paypal = ({
  amount,
  currency,
  products,
  delivery,
  errors,
  loading_,
  addresses
}) => {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = loading_
  const parseAmount = parseFloat(amount).toFixed(2)
  const { push } = useRouter()

  const paypalOptions = {
    'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    currency: currency ?? 'USD',
    intent: 'capture'
  }
  return (
    <div className="w-full rounded-lg text-xl font-bold">
      <PayPalScriptProvider options={paypalOptions}>
        <PayPalButtons
          style={{
            layout: 'vertical'
          }}
          onClick={(data, actions) => {
            setLoading(true)
          }}
          createOrder={(data, actions) => {
            setLoading(true)
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: '' + parseAmount
                  }
                }
              ]
            })
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              axios
                .post('/api/addressee', {
                  addressee: [
                    addresses?.addresse,
                    addresses?.countrie,
                    addresses?.municipality,
                    addresses?.province
                  ]
                })
                .then((saveAddressee) => {
                  if (saveAddressee?.data?.message) {
                    toast.info(
                      saveAddressee.data.message ?? 'Contacte al administrator'
                    )
                    axios
                      .post('/api/checkout/addressee', {
                        amount,
                        currency,
                        products,
                        addresses: saveAddressee.data.data,
                        details,
                        delivery,
                        type: 'paypal'
                      })
                      .then((payment) => {
                        if (payment?.data?.message) {
                          toast.info(
                            payment.data.message ?? 'Contacte al administrator'
                          )
                          setTimeout(() => {
                            push('/page/payment-success').then()
                          }, 3000)
                        }
                      })
                  }
                })
            })
          }}
          onError={() => {
            push('/page/payment-error').then()
          }}
        />
      </PayPalScriptProvider>
    </div>
  )
}

export default Paypal
