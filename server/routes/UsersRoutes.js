import {Router} from 'express'
import {getUsersController} from '../controllers/UserController.js'
import verifyToken from '../middlewares/VerifyToken.js'


const router = Router()

router.get('/list', verifyToken, getUsersController)

export default router;

