import { getSession } from 'next-auth/react'
import resources from '../../restapi/resources'

const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { account: [activeAccount] } = req.body
      const session = await getSession({ req })
      if (!session?.user?.email) {
        return res.status(401).json({ statusCode: 401, message: 'Error en la solicitud.' })
      }
      const users = await resources.users.all()
      const { results } = users.data
      const user = results.find(user => user.email === session?.user?.email)
      if (!!activeAccount && activeAccount?.id === user?.id) {
        const {
          id,
          name,
          ...restAccount
        } = activeAccount
        const accounts = {
          ...restAccount,
          ...{
            name
          }
        }
        try {
          await resources.users.update(user?.id, accounts)
        } catch (err) {
          return res.status(500).json({ statusCode: 500, message: 'Contacte al administrator' })
        }
        return res.status(200).json({ statusCode: 200, message: 'Datos guardados' })
      } else {
        return res.status(200).json({ statusCode: 200, message: 'Complete los campos obligatorios' })
      }
    }
  } catch (_) {
    res.status(500).json({ statusCode: 500, message: 'Contacte al administrator' })
  }
}

export default handler
