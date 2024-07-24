import express from 'express'
import { getPosts, getPost ,createPost, updatePost, deletePost, getPostByAuthor } from '../controllers/postController'
import { authenticate } from '../middleware/authMiddleware'

const router = express.Router()

router.get('/', getPosts)
router.get('/:postId', getPost)
router.get('/author/:author', getPostByAuthor)
router.post('/', authenticate, createPost)
router.patch('/:postId', updatePost)
router.delete('/:postId', authenticate, deletePost)

export default router