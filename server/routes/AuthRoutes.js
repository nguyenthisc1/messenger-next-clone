import {Router} from 'express'
import {getProfileController, loginController, registerController} from '../controllers/AuthController.js'
import verifyToken from '../middlewares/VerifyToken.js'
const router = Router()

router.post('/login', loginController)
router.post('/register', registerController)
router.get('/profile', verifyToken, getProfileController)

export default router;