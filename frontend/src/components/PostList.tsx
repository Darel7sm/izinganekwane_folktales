import { Posts } from '../models/Post'
import { Link } from 'react-router-dom'

interface PostProps {
  post: Posts
}

const PostList = ({ post }: PostProps) => {
  const { firstTitle, secondTitle, author, text, createdAt, updatedAt } = post

  const dateFormat = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const postCreatedOrUpdated =
    createdAt >= updatedAt
      ? 'Created: ' + dateFormat(createdAt)
      : 'Updated: ' + dateFormat(updatedAt)

  return (
    <div className="p-2">
      <h1 className="text-2xl font-semibold text-center pb-7">
        {firstTitle.toLocaleUpperCase()}
      </h1>
      <h1>Kwesukesukela</h1>
      <p className="italic">Cosu</p>
      <h2 className="font-bold">{secondTitle}</h2>
      <p className="italic">Sampheka ngogazwana!</p>
      <p className="pb-5 pt-1">
        By:{' '}
        <span className="text-slate-950 font-semibold">
          {author.toLowerCase()}
        </span>
      </p>
      <p>{text.slice(0, 300)}...</p>
      <p className='py-4 text-slate-950 font-bold hover:text-slate-500'>
        <Link to={`/Post/${post._id}`}>Read more</Link>
      </p>
      <p>{postCreatedOrUpdated}</p>
    </div>
  )
}

export default PostList
