import exrpess, {Request, Response, Router} from 'express'
import Database from '../Database/connect'


const router = Router();

router.get('/get_order', (req: Request, res: Response) => {
    const { order: order_id } = req.query

    !order_id? res.json({'Error': 'Please provide order id'}) : null
    
    const { databaseConnection } = Database
    try {
        if(databaseConnection.connection) {

        }else {
            res.json({
                error: 'An Error Occured',
                message: 'Database Connection Error'
            })
        }

    }catch(e) {
        res.json({
            error: 'An Error Occured',
            message: e
        })
    }
})