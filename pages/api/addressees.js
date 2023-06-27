import { authOptions } from '../../libs/auth'
import { getServerSession } from "next-auth/next"

import { isEmpty } from '../../libs/serialize'
import resources from '../../restapi/resources'

const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const {
        addressee: [addressees, country, municipality, province]
      } = req.body
      const session = await getServerSession(req, res, authOptions)
      if (!session?.user?.email) {
        return res
          .status(401)
          .json({ statusCode: 401, message: 'Error en la solicitud.' })
      }
      const user = await resources.users.get(session?.user?.email)
      if (addressees && country && municipality && province) {
        const { id, pais, email, provincia, municipio, activo, ...restAddressees } =
          addressees
        const addressee = {
          ...restAddressees,
          ...{
            usuario: user?.id,
            pais: country?.id,
            provincia: province?.id,
            municipio: municipality?.id,
            email: email.replace(/\s+/g, '').toLowerCase(),
            activo: false
          }
        }
        const get_destinatarios = await resources.recipients.all()
        const destinatarios_response = get_destinatarios?.data?.results
        const destinatario = destinatarios_response.find(
          (destinatario) =>
            destinatario?.usuario === user?.id && destinatario?.nombre === addressee?.nombre
        )
        if (isEmpty(destinatario)) {
          const createAddressees = await resources.recipients.create(addressee)
          return res
            .status(201)
            .json({ statusCode: 201, data: createAddressees.data ?? {}, message: 'Guardada.' })
        } else {
          const currentAddresse = await resources.recipients.one(destinatario?.id)
          const { activo, email, ...current_addresse_response } = currentAddresse.data
          const obj1 = JSON.stringify({ id: destinatario?.id, ...addressee })
          const obj2 = JSON.stringify({ ...current_addresse_response, email, activo })
          if (obj1 !== obj2) {
            try {
              const updateAddressees = await resources.recipients.update(destinatario?.id, { id: destinatario?.id, ...addressee })
              return res.status(200).json({
                statusCode: 200,
                message: 'Guardada',
                data: updateAddressees.data ?? {}
              })
            } catch (_) {
              return res.status(500).json({
                statusCode: 500,
                message: 'Contacte al administrator'
              })
            }
          } else {
            return res.status(200).json({
              statusCode: 200,
              message: 'Guardada.',
              data: { id: destinatario?.id, ...addressee }
            })
          }
        }
      } else {
        return res
          .status(200)
          .json({ statusCode: 200, message: 'Complete los campos obligatorios' })
      }
    }
    return res
      .status(401)
      .json({ statusCode: 401, message: 'Error en la solicitud.' })
  } catch (_) {
    console.log(_)
    return res
      .status(200)
      .json({ statusCode: 500, message: 'Contacte al administrator' })
  }
}

export default handler
