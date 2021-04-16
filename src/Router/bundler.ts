import express , {Router,  Request, Response} from 'express'
import Client from './client'


const router = Router();
 
router.use('/client', Client)

router.get('/', (req: Request, res: Response) => {
        res.send("<body style='background-color: black'> <h1 style='color:white'> Welcome To Downtown! </h1> </body>")
})

export default router