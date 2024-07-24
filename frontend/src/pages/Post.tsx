import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Post {
  _id: string;
  firstTitle: string;
  secondTitle: string;
  author: string;
  text: string;
  createdAt: string;
}

const Post: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5400/api/posts/${postId}`);
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">{error}</div>;
  }

  if (!post) {
    return <div className="flex justify-center items-center h-screen">No post found</div>;
  }

  return (
    <div className="container mx-auto p-5 md:p-10 grid place-content-center w-4/5">
      <div className="bg-slate-300 shadow-md rounded-lg p-6 md:p-12">
        <h1 className="text-3xl font-bold mb-16 text-center">
          {post.firstTitle}
        </h1>
        <h1>Kwesukesukela</h1>
        <p className="italic">Cosu</p>
        <h2 className="text-xl font-bold">{post.secondTitle}</h2>
        <p className="italic mb-8">Sampheka ngogazwana!</p>
        <div className="text-gray-800 leading-7 mb-6">{post.text}</div>
        <h1>Cosu cosu iyaphela!</h1>
        <div className="flex justify-between items-center mt-8">
          <div className="flex items-center">
            <div className="text-sm">
              <p className="text-gray-900 leading-none">{post.author}</p>
              <p className="text-slate-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Post;
