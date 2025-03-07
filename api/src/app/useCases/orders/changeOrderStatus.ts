import { Request, RequestHandler, Response } from 'express'

import { Order } from '../../models/Order'

export const changeOrderStatus: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const { orderId } = req.params
    const { status } = req.body

    if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
      res.status(400).json({
        error: 'Status must be one of these: WAITING, IN_PRODUCTION and DONE.',
      })
      return
    }

    await Order.findByIdAndUpdate(orderId, { status })

    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}
