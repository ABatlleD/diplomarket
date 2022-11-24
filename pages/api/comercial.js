import resources from '../../restapi/resources'

const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { nombre_entidad, nombre_representante_entidad, email, telefono, direcion, resena } = req.body
      if (
        !!nombre_entidad &&
        !!nombre_representante_entidad &&
        !!email &&
        !!telefono &&
        !!direcion &&
        !!resena
      ) {
        // eslint-disable-next-line no-unused-vars
        const contacto = await resources.comercial({
          nombre_entidad,
          nombre_representante_entidad,
          email: email.replace(/\s+/g, '').toLowerCase(),
          telefono,
          direcion,
          resena
        })
        // const makePayment = await AxiosInstance.post(`/api/checkout/payload/${JSON.stringify(order)}`);
        return res.status(200).json({ statusCode: 200, status: 'ok', message: 'Mensaje enviado.' })
      } else {
        return res.status(200).json({ statusCode: 200, message: 'Complete los campos obligatorios' })
      }
    }
    return res.status(401).json({ statusCode: 401, message: 'Error en la solicitud.' })
  } catch (err) {
    // console.log(err)
    return res.status(500).json({ statusCode: 200, message: 'Contacte al administrator' })
  }
}

export default handler
