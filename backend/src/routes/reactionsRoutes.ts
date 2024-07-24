import express from 'express'
import { authenticate } from '../middleware/authMiddleware'
import { commentPost, dislikePost, favoritePost, likePost } from '../controllers/reactionsController'

const router = express.Router()

router.patch('/:postId/like', authenticate, likePost)
router.patch('/:postId/dislike', authenticate, dislikePost)
router.post('/:postId/comment', authenticate, commentPost)
router.patch('/:postId/favorite', authenticate, favoritePost)

export default router
