import { Connection } from 'typeorm'
import { Order } from '../entity/order'
import { Order as order } from '../models/types'
import { DatabaseAction } from '../models/responseTypes'

const createOrder = async(connection: Connection, order: order ): Promise<DatabaseAction> => {
    const createdOrder = new Order()
    const result = await connection.manager
    .save(createdOrder)
    .then((order => {
        return { didSucceed: true, data: order.id } as DatabaseAction
    }))
    .catch((err => {
        return {didSucceed: false, error: err} as DatabaseAction
    }))    

    return result
}

export { createOrder }