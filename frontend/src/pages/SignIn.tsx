import React, { SyntheticEvent, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login } = useContext(AuthContext)

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    try {
      await login(email, password)
      window.location.href = '/'
      console.log('Signed-In Successful')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-slate-950">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
