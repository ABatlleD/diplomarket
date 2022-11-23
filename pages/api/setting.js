import { getSession } from 'next-auth/react'
import resources from '../../restapi/resources'

const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { setting: [oldPassword, newPassword] } = req.body
      const session = await getSession({ req })
      if (!session?.user?.email) {
        return res.status(401).json({ statusCode: 401, message: 'Error en la solicitud.' })
      }
      const users = await resources.users.all()
      const { results } = users.data
      const user = results.find(user => user.email === session?.user?.email)
      if (!!oldPassword && !!newPassword && oldPassword !== newPassword) {
        try {
          const auth = await resources.auth.signin({ username: session?.user?.email, password: oldPassword })
          const auth_response = auth.data
          if (!!auth_response?.token && !!user?.id) {
            try {
              // eslint-disable-next-line no-unused-vars
              const updateUser = await resources.auth.changePassword({ id: user?.id, password: newPassword })
            } catch (_) {
              return res.status(200).json({ statusCode: 500, message: 'Contacte al administrator' })
            }
            return res.status(200).json({ statusCode: 200, status: 'OK', message: 'Guardada.' })
          } else {
            return res.status(200).json({ statusCode: 200, message: 'Complete los campos obligatorios' })
          }
        } catch (_) {
          return res.status(200).json({ statusCode: 200, message: 'Complete los campos obligatorios' })
        }
      } else {
        return res.status(200).json({ statusCode: 200, message: 'Complete los campos obligatorios' })
      }
    }
  } catch (_) {
    // console.log(_)
    res.status(500).json({ statusCode: 500, message: 'Contacte al administrator' })
  }
}

export default handler
