import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const EditPost = () => {
  const { id } = useParams<{ id: string }>()
  const [firstTitle, setFirstTitle] = useState('')
  const [secondTitle, setSecondTitle] = useState('')
  const [text, setText] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5400/api/posts/${id}`
        )
        const post = response.data
        setFirstTitle(post.firstTitle)
        setSecondTitle(post.secondTitle)
        setText(post.text)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPost()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.patch(
        `http://localhost:5400/api/posts/${id}`,
        { firstTitle, secondTitle, text },
        { withCredentials: true }
      )
      navigate('/My-Posts')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto">
      <h2>Edit Post</h2>
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
        <ReactQuill theme="snow" value={text} onChange={setText} />
        <button type="submit" className="bg-blue-500 text-white p-2 mt-4">
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default EditPost
