import { RequestHandler } from 'express'
import PostModel from '../models/post'

const getPosts: RequestHandler = async (req, res, next) => {
  try {
    const posts = await PostModel.find().exec()

    if (!posts || posts.length === 0) {
      return res.status(404).json({ gettingPostsError: 'Could not find posts' })
    }

    res.status(200).json(posts)
  } catch (error) {
    next(error)
  }
}

const getPost: RequestHandler = async (req, res, next) => {
  const postId = req.params.postId

  try {
    const post = await PostModel.findById(postId).exec()

    if (!post) {
      return res.status(404).json({ gettingPostError: 'Post not found' })
    }

    res.status(200).json(post)
  } catch (error) {
    next(error)
  }
}


const getPostByAuthor: RequestHandler = async (req, res, next) => {
  const author = req.params.author

  try {
    const posts = await PostModel.find({ author }).exec()

    if (!posts || posts.length === 0) {
      return res
        .status(404)
        .json({ gettingPostsError: 'No posts found for this author' })
    }

    res.status(200).json(posts)
  } catch (error) {
    next(error)
  }
}



interface PostTypes {
  firstTitle: string
  secondTitle: string
  author: string
  text: string
}

const createPost: RequestHandler<unknown, unknown, PostTypes, unknown> = async (
  req,
  res,
  next
) => {
  const { firstTitle, secondTitle, author, text } = req.body

  try {
    const newPost = await PostModel.create({
      firstTitle,
      secondTitle,
      author,
      text,
    })
    if (!newPost) {
      return res
        .status(400)
        .json({ creatingPostError: 'There was an error creating post' })
    }

    res
      .status(201)
      .json({ newPost, postCreatedSuccess: 'Post created successfully' })
  } catch (error) {
    next(error)
  }
}


interface updatePostType {
  postId: string
}

const updatePost: RequestHandler<
  updatePostType,
  unknown,
  PostTypes,
  unknown
> = async (req, res, next) => {
  const postId = req.params.postId
  const { firstTitle, secondTitle, author, text } = req.body

  try {
    const post = await PostModel.findById(postId).exec()

    if (!post) {
      return res.status(404).json({ findingPostError: 'Post not found' })
    }

    if (!firstTitle) {
      return res
        .status(400)
        .json({ firstTiteError: 'The title name is required' })
    }
    if (!secondTitle) {
      return res
        .status(400)
        .json({ secondTiteError: 'The title name is required' })
    }
    if (!author) {
      return res
        .status(400)
        .json({ authorError: 'The author name is required' })
    }
    if (!text) {
      return res.status(400).json({ textError: 'The content is required' })
    }

    post.firstTitle = firstTitle
    post.secondTitle = secondTitle
    post.author = author
    post.text = text

    const updatedPost = await post.save()
    if (!updatedPost) {
      return res
        .status(404)
        .json({ updatingPostError: 'There was an error updating post' })
    }

    res
      .status(201)
      .json({ updatedPost, updatedPostSuccess: 'Post updated successfully' })
  } catch (error) {
    next(error)
  }
}

const deletePost: RequestHandler = async (req, res, next) => {
  const postId = req.params.postId

  try {
    const post = await PostModel.findById(postId).exec()

    if (!post) {
      return res.status(404).json({ findingDeletedPostError: 'Post not found' })
    }

    await PostModel.findByIdAndDelete(postId)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}

export { getPosts, getPost, getPostByAuthor, createPost, updatePost, deletePost }
