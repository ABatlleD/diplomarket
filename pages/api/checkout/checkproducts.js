import resources from '../../../restapi/resources'

const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { products } = req.body
      const checkOk = await Promise.all(products?.items?.map(obj => resources.products.one(obj?.id)))
        .then((product) => {
          return product.some(result => {
            const producto = result?.data
            return products?.items?.some((item) => item?.id === producto?.id && item?.quantity > producto?.cant_inventario)
          })
        })
      return checkOk
        ? res.status(200).json({ statusCode: 200, failed: true })
        : res.status(200).json({ statusCode: 200, failed: false })
    }
    return res.status(200).json({ statusCode: 200, message: 'Error en la solicitud.' })
  } catch (_) {
    return res.status(200).json({ statusCode: 500, message: 'Contacte al administrator' })
  }
}

export default handler
