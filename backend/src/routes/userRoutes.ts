import express from "express"
import { deleteUser, getUser, forgotPassword, resetPassword, signIn, signUp, signout, updateUserDetails }from '../controllers/userController'
import { authenticate } from "../middleware/authMiddleware"

const router = express.Router()

router.post('/sign-up', signUp)
router.post('/sign-in', signIn)
router.get('/', authenticate, (req, res) => {
    res.status(200).json({ message: 'You have access to this protected route', user: req.user })
})
router.get('/sign-out', authenticate, signout)
router.get('/:userId', getUser)
router.put('/:userId', updateUserDetails)
router.post('/forgot-password', forgotPassword)
router.get('/reset-password/:id/:token', resetPassword)
router.delete('/:userId', deleteUser)

export default router