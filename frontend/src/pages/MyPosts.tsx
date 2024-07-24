// MyPosts.tsx
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { Posts } from '../models/Post'

const MyPosts = () => {
  const [posts, setPosts] = useState<Posts[]>([])
  const { isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5400/api/posts/author',
          {
            withCredentials: true,
          }
        )
        setPosts(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    if (isAuthenticated) {
      fetchPosts()
    }
  }, [isAuthenticated])

  const handleDelete = async (postId: string) => {
    try {
      await axios.delete(`http://localhost:5400/api/posts/${postId}`, {
        withCredentials: true,
      })
      setPosts(posts.filter((post) => post._id !== postId))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto grid place-content-center place-items-center min-h-svh">
      {posts.length === 0 ? (
        <div className='grid place-content-center place-items-center'>
          <p className="text-xl font-semibold">You have not yet made a post</p>
          <button className="bg-slate-950 text-slate-300 py-2 px-10 rounded-md mt-20 w-fit hover:bg-slate-500">
            <Link to="/Create-Post">Create one</Link>
          </button>
        </div>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="border p-4 mb-4">
            <h3>{post.firstTitle}</h3>
            <h4>{post.secondTitle}</h4>
            <p>{post.text.slice(0, 100)}...</p>
            <Link to={`/Edit-Post/${post._id}`} className="mr-4">
              Edit
            </Link>
            <button
              onClick={() => handleDelete(post._id)}
              className="text-red-500">
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default MyPosts
