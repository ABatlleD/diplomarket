import { authOptions } from '../../../libs/auth'
import { getServerSession } from "next-auth/next"
import { AxiosBackendClient } from '../../../restapi';

const handler = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const {order_id} = req.body;
            const session = await getServerSession(req, res, authOptions);
            if (!session?.user?.email) {
                return res.status(401).json({statusCode: 401, message: 'Error en la solicitud.'});
            }
            if (order_id) {
                try {
                    const checkOrder = await AxiosBackendClient.post('/tropipay/verify/', {orden_id: order_id});
                    const checkOrder_response = checkOrder?.data;
                    if (checkOrder_response?.status !== 'K.O')
                        return res.status(200).json({statusCode: 200, enlace: checkOrder_response?.status, message: 'ready_link'})
                    else 
                        return res.status(200).json({statusCode: 200, error: true, message: 'error_link'})
                } catch (_) {
                    return res.status(200).json({statusCode: 200, error: true, message: 'error_link'})
                }
            } else {
                return res.status(200).json({statusCode: 200, error: true, message: 'error_request'})
            }
        }
        return res.status(401).json({statusCode: 401, error: true, message: 'error_request'});
    } catch (_) {
        return res.status(200).json({ statusCode: 500, error: true, message: 'error_contact' })
    }
}

export default handler