import { RequestHandler } from 'express'
import ReactionsModel from '../models/reactions'

const likePost: RequestHandler = async (req, res, next) => {
  const postId = req.params.postId
  const userId = req.user.userId

  try {
    const post = await ReactionsModel.findById(postId).exec()
    if (!post) return res.status(404).json({ error: 'Post not found' })

    if (post.likes.includes(userId)) {
      post.likes.pull(userId) // unlike
    } else {
      post.likes.push(userId) // like
    }

    await post.save()
    res.status(200).json(post)
  } catch (error) {
    next(error)
  }
}

const dislikePost: RequestHandler = async (req, res, next) => {
  const postId = req.params.postId
  const userId = req.user.userId

  try {
    const post = await ReactionsModel.findById(postId).exec()
    if (!post) return res.status(404).json({ error: 'Post not found' })

    if (post.dislikes.includes(userId)) {
      post.dislikes.pull(userId) // remove dislike
    } else {
      post.dislikes.push(userId) // dislike
    }

    await post.save()
    res.status(200).json(post)
  } catch (error) {
    next(error)
  }
}

const commentPost: RequestHandler = async (req, res, next) => {
  const postId = req.params.postId
  const { text } = req.body
  const userId = req.user.userId

  try {
    const post = await ReactionsModel.findById(postId).exec()
    if (!post) return res.status(404).json({ error: 'Post not found' })

    post.comments.push({ userId, text })
    await post.save()

    res.status(200).json(post)
  } catch (error) {
    next(error)
  }
}

const favoritePost: RequestHandler = async (req, res, next) => {
  const postId = req.params.postId
  const userId = req.user.userId

  try {
    const post = await ReactionsModel.findById(postId).exec()
    if (!post) return res.status(404).json({ error: 'Post not found' })

    if (post.favorites.includes(userId)) {
      post.favorites.pull(userId) // remove from favorites
    } else {
      post.favorites.push(userId) // add to favorites
    }

    await post.save()
    res.status(200).json(post)
  } catch (error) {
    next(error)
  }
}

export { likePost, dislikePost, commentPost, favoritePost }
