import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../libs/auth'
import resources from '../../restapi/resources'

const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { message } = req.body
      const session = await getServerSession(req, res, authOptions)
      if (!session?.user?.email) {
        return res.status(200).json({ statusCode: 401, message: 'Error en la solicitud.' })
      }
      const users = await resources.users.all()
      const { results } = users.data
      const user = results.find(user => user.email === session?.user?.email)
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
