import { getSession } from 'next-auth/react'
import resources from '../../restapi/resources'

const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { message } = req.body
      const session = await getSession({ req })
      if (!session?.user?.email) {
        return res.status(200).json({ statusCode: 401, message: 'Error en la solicitud.' })
      }
      const user = await resources.users.get(session?.user?.email)
      if (message) {
        await resources.contact({ mensaje: message, respondida: false, usuario: user?.id })
        return res.status(200).json({ statusCode: 200, status: 'ok', message: 'Comentario enviado.' })
      } else {
        return res.status(200).json({ statusCode: 200, message: 'Complete los campos obligatorios' })
      }
    }
    return res.status(401).json({ statusCode: 401, message: 'Error en la solicitud.' })
  } catch (err) {
    return res.status(500).json({ statusCode: 200, message: 'Contacte al administrator' })
  }
}

export default handler
