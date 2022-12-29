import { v4 as uuidv4 } from 'uuid'
import { getSession } from 'next-auth/react'
import { DateTime } from 'luxon'
import { isEmpty } from '../../../libs/serialize'
import resources from '../../../restapi/resources'
import { AxiosInstanceApi } from '../../../restapi'

const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { amount, currency, products, addresses, details, type } = req.body
      console.log('🚀 ~ file: addressees.js:12 ~ handler ~ addresses', req.body)
      const session = await getSession({ req })
      if (!session?.user?.email) {
        return res.status(401).json({ statusCode: 401, message: 'Error en la solicitud.' })
      }
      let deliveryPay = null
      const users = await resources.users.all()
      const { results } = users.data
      const user = results.find(user => user.email === session?.user?.email)
      if (amount && currency && products && addresses && details) {
        const free = !isEmpty(products) && products?.every((item) => {
          return item?.free_shipping === true
        })
        if (!free) {
          const delivery_req = await AxiosInstanceApi.post('/api/checkout/checkdelivery', { items: products, municipio: addresses?.municipio })
            .catch((err) => {
              console.log('🚀 ~ file: addressees.js:29 ~ handler ~ err', err)
            })
          deliveryPay = delivery_req?.data?.total
        }
        if (deliveryPay !== 0 && !free && !(deliveryPay)) { return res.status(200).json({ statusCode: 500, message: 'Revise su destinatario.' }) }
        deliveryPay = !free ? deliveryPay : 0
        if (type === 'paypal') {
          const fecha_creada = DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss')
          const total = parseFloat((amount + (!free ? deliveryPay : 0)))
          const user_id = user?.id
          const destinatario = addresses.id
          const componente = []
          for await (const item of products) {
            const component = {
              cantidad: item?.quantity,
              respaldo: parseFloat(item?.itemTotal).toFixed(2),
              producto: item?.id
            }
            componente.push(component)
          }
          const order = {
            fecha_creada,
            uuid: details?.id ?? 'Error al obtener datos',
            status: details?.status ?? 'Error al obtener datos',
            currency: details?.purchase_units[0]?.amount?.currency_code ?? 'Error al obtener datos',
            comerciante: details?.purchase_units[0]?.payee?.merchant_id ?? 'Error al obtener datos',
            comprador: details?.payer?.payer_id ?? 'Error al obtener datos',
            enlace: details?.links[0]?.href ?? 'Error al obtener datos',
            total: parseFloat((total + total * 0.05 + 0.49).toFixed(2)),
            user: user_id,
            precio_envio: !free ? deliveryPay : 0,
            destinatario,
            componente: JSON.stringify(componente).replaceAll('"', "'"),
            tipo: type ?? 'paypal'
          }
          try {
            // eslint-disable-next-line no-unused-vars
            const makePayment = await resources.checkout(order)
            return res.status(200).json({ statusCode: 200, message: 'Pago completo.' })
          } catch (_) {
            if (_?.response?.status === '401') { return res.status(200).json({ statusCode: 200, message: 'Pago completo.' }) }
            return res.status(200).json({ statusCode: 500, message: 'Contacte al administrator' })
          }
        } else if (type === 'tropipay') {
          const checkItem = products?.filter((product) => product?.max < product?.quantity)
          if (!isEmpty(checkItem)) {
            return res.status(200).json({ statusCode: 200, failed: true })
          }
          const timeZone = 'Europe/Madrid'
          const fecha_creada = DateTime.local().setZone(timeZone).toFormat('yyyy-MM-dd HH:mm:ss')
          const total = parseFloat((amount + (!free ? deliveryPay : 0))).toFixed(2)
          const user_id = user?.id
          const destinatario = addresses.id
          const componente = []
          for await (const item of products) {
            const component = {
              cantidad: item?.quantity,
              respaldo: parseFloat(item?.itemTotal).toFixed(2),
              producto: item?.id
            }
            componente.push(component)
          }
          const order = {
            uuid: uuidv4(),
            fecha_creada,
            resumen_pago: '',
            total,
            precio_envio: !free ? deliveryPay : 0,
            user: user_id,
            destinatario,
            componente: JSON.stringify(componente).replaceAll('"', "'"),
            currency,
            tipo: type ?? 'tropipay'
          }
          try {
            const makePayment = await resources.checkout(order)
            return res.status(200).json({ statusCode: 200, url: makePayment?.data?.url ?? '', message: 'Pago completo.' })
          } catch (_) {
            if (_?.response?.status === '401') { return res.status(200).json({ statusCode: 200, url: _?.response?.data?.url ?? '', message: 'Pago completo.' }) }
            return res.status(200).json({ statusCode: 500, message: 'Contacte al administrator' })
          }
        } else if (type === 'zelle') {
          console.log('zelle')
          const checkItem = products?.filter((product) => product?.max < product?.quantity)
          if (!isEmpty(checkItem)) {
            console.log('empty')
            return res.status(200).json({ statusCode: 200, failed: true })
          }
          // eslint-disable-next-line no-unused-vars
          const timeZone = 'Europe/Madrid'
          const fecha_creada = DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss')
          const total = parseFloat((amount + (!free ? deliveryPay : 0))).toFixed(2)
          const user_id = user?.id
          const destinatario = addresses.id
          const componente = []
          for await (const item of products) {
            const component = {
              cantidad: item?.quantity,
              respaldo: parseFloat(item?.itemTotal).toFixed(2),
              producto: item?.id
            }
            componente.push(component)
          }
          const order = {
            fecha_creada,
            resumen_pago: '',
            total,
            precio_envio: !free ? deliveryPay : 0,
            user: user_id,
            destinatario,
            componente: JSON.stringify(componente).replaceAll('"', "'"),
            currency,
            tipo: type ?? 'tropipay'
          }
          try {
            console.log('🚀 ~ file: addressees.js:138 ~ handler ~ order', order)
            const makePayment = await resources.checkout(order)
            return res.status(200).json({ statusCode: 200, data: makePayment?.data, message: 'Pago completo.' })
          } catch (_) {
            console.log('🚀 ~ file: addressees.js:140 ~ handler ~ _')
            if (_?.response?.status === '401') { return res.status(200).json({ statusCode: 200, data: _?.response?.data, message: 'Pago completo.' }) }
            return res.status(200).json({ statusCode: 500, failed: true, message: 'Contacte al administrator' })
          }
        } else if (type === 'directo') {
          const checkItem = products?.filter((product) => product?.max < product?.quantity)
          if (!isEmpty(checkItem)) {
            return res.status(200).json({ statusCode: 200, failed: true })
          }
          // eslint-disable-next-line no-unused-vars
          const timeZone = 'Europe/Madrid'
          const fecha_creada = DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss')
          const total = parseFloat((amount + (!free ? deliveryPay : 0))).toFixed(2)
          const user_id = user?.id
          const destinatario = addresses.id
          const componente = []
          for await (const item of products) {
            const component = {
              cantidad: item?.quantity,
              respaldo: parseFloat(item?.itemTotal).toFixed(2),
              producto: item?.id
            }
            componente.push(component)
          }
          const order = {
            fecha_creada,
            resumen_pago: '',
            total,
            precio_envio: !free ? deliveryPay : 0,
            user: user_id,
            destinatario,
            componente: JSON.stringify(componente).replaceAll('"', "'"),
            currency,
            tipo: type ?? 'tropipay'
          }
          try {
            const makePayment = await resources.checkout(order)
            return res.status(200).json({ statusCode: 200, data: makePayment?.data, message: 'Pago completo.' })
          } catch (_) {
            if (_?.response?.status === '401') { return res.status(200).json({ statusCode: 200, data: _?.response?.data, message: 'Pago completo.' }) }
            return res.status(200).json({ statusCode: 500, failed: true, message: 'Contacte al administrator' })
          }
        } else if (type === 'banco') {
          const credit_card = details?.number.replace(/\s+/g, '')
          const month = details?.expiry.split('/')[0]
          const date = DateTime.now().toFormat('yyyy')
          const year = `${date.slice(0, 2)}${details?.expiry.split('/')[1]}`
          const cvv = details?.cvc
          const pais = details?.pais
          const area = details?.estado
          const locacion = details?.locacion
          const postal = details?.postal
          const direccion = details?.direccion
          const checkItem = products?.filter((product) => product?.max < product?.quantity)
          if (!isEmpty(checkItem)) {
            return res.status(200).json({ statusCode: 200, failed: true })
          }
          const fecha_creada = DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss')
          const total = parseFloat((amount + (!free ? deliveryPay : 0))).toFixed(2)
          const user_id = user?.id
          const destinatario = addresses.id
          const componente = []
          for await (const item of products) {
            const component = {
              cantidad: item?.quantity,
              respaldo: parseFloat(item?.itemTotal).toFixed(2),
              producto: item?.id
            }
            componente.push(component)
          }
          const order = {
            fecha_creada,
            resumen_pago: '',
            total,
            precio_envio: !free ? deliveryPay : 0,
            user: user_id,
            destinatario,
            componente: JSON.stringify(componente).replaceAll('"', "'"),
            currency,
            credit_card,
            month,
            year,
            cvv,
            pais,
            area,
            locacion,
            postal,
            direccion,
            tipo: type ?? 'banco'
          }
          try {
            const makePayment = await resources.bofa(order)
            return res.status(200).json({ statusCode: 200, message: makePayment?.data?.status })
          } catch (_) {
            switch (_?.response?.status) {
              case 400:
                return res.status(200).json({ statusCode: 200, message: _?.response?.data?.status })
              case 401:
                return res.status(200).json({ statusCode: 200, message: _?.response?.data?.status })
              default:
                return res.status(200).json({ statusCode: 500, failed: true, message: 'Contacte al administrator' })
            }
          }
        }
        return res.status(200).json({ statusCode: 200, message: 'Pago completo.' })
      } else {
        return res.status(200).json({ statusCode: 200, message: 'Complete los campos obligatorios' })
      }
    }
    return res.status(200).json({ statusCode: 401, failed: true, message: 'Error en la solicitud.' })
  } catch (_) {
    console.log('🚀 ~ file: addressees.js:254 ~ handler ~ _', _)
    return res.status(200).json({ statusCode: 500, failed: true, message: 'Contacte al administrator' })
  }
}

export default handler
