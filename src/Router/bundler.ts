import express , {Router} from 'express'
import Client from './client'


const router = Router();
 
router.use('/client', Client)

export default router