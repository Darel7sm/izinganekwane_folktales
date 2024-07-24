import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
// import { convert } from 'html-to-text'

const CreatePost = () => {
  const [firstTitle, setFirstTitle] = useState('')
  const [secondTitle, setSecondTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [text, setText] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5400/api/users/', {
          withCredentials: true,
        })
        if (response.status === 200) {
          setIsLoggedIn(true)
          setAuthor(response.data.user.name)
        } else {
          navigate('/Sign-In')
        }
      } catch (error) {
        navigate('/Sign-In')
      }
    }
    checkLoginStatus()
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // const plainText = convert(text, {
    //   wordwrap: 130,
    // })

    try {
      await axios.post(
        'http://localhost:5400/api/posts/',
        { firstTitle, secondTitle, author, text },
        { withCredentials: true }
      )
      navigate('/My-Posts')
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  if (!isLoggedIn) {
    return null // Render nothing if not logged in
  }

  return (
    <div className="container mx-auto grid place-content-center">
      <h2 className="text-center text-3xl font-bold py-10">Create Post</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          placeholder="First Title"
          value={firstTitle}
          onChange={(e) => setFirstTitle(e.target.value)}
          required
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Second Title"
          value={secondTitle}
          onChange={(e) => setSecondTitle(e.target.value)}
          required
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="border p-2"
        />
        <ReactQuill
          theme="snow"
          ref='quill-editor' 
          value={text}
          onChange={setText}
          placeholder="Write your text here"
        />
        <div className="grid place-content-center">
          <button
            type="submit"
            className="bg-slate-950 text-slate-300 py-2 px-10 rounded-md mt-20 w-fit hover:bg-slate-500">
            Post
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreatePost
