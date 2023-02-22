import resources from "../../../restapi/resources"

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { items, municipio } = req.body
      const componente = []
      for await (const item of items) {
        const component = {
          cantidad: item?.quantity,
          respaldo: parseFloat(item?.itemTotal).toFixed(2),
          producto: item?.id,
        }
        componente.push(component)
      }
      const checkDelivery = await resources.delivery.create({
        componentes: JSON.stringify(componente).replaceAll('"', "'"),
        municipio,
      })

      return "status" in checkDelivery?.data
        ? res
            .status(200)
            .json({ statusCode: 200, total: checkDelivery?.data?.status })
        : res.status(200).json({
            statusCode: 200,
            message: "Verifique su carrito o municipio.",
          })
    }
    return res
      .status(200)
      .json({ statusCode: 200, message: "Error en la solicitud." })
  } catch (_) {
    return res
      .status(200)
      .json({ statusCode: 500, message: "Contacte al administrator" })
  }
}

export default handler
