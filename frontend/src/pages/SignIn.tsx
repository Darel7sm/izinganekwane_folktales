import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const SignIn: React.FC = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState<string | null>(null) 
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setData({
      ...data,
      [e.target.name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const loginInfo = await login(data.email, data.password)
        
      console.log(loginInfo)

      navigate('/')
      window.location.reload()
    } catch (error) {
      const errorMessage = (error as Error).message
      setError(errorMessage)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit}>
          {error && (
            <p className="mb-4 text-red-600">{error}</p> 
          )}
          <div className="mb-4 text-slate-950">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-3 py-2 border rounded"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-3 py-2 border rounded"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <p className="mb-5 text-red-600 hover:text-slate-300">
            <Link to="/Forgot-Password">Forgot Password?</Link>
          </p>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-slate-950 text-slate-300 py-2 px-10 rounded-md mt-2 w-fit hover:bg-slate-500 font-bold focus:outline-none focus:shadow-outline">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn
